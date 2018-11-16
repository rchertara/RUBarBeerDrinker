from sqlalchemy import create_engine
from sqlalchemy import sql

import json
from BarBeerDrinker import config

engine = create_engine(config.database_uri)

def get_bars():
    with engine.connect() as con:
        rs = con.execute("SELECT * from BarTable;")
        return [dict(row) for row in rs]

def getBeerTime(beer):
    with engine.connect() as con:
        query=sql.text('select b.time as time ,SUM(Quantity) as finalQ from BillsTable b, TransactionTable t, ItemsTable i \
        where i.name=:beer AND i.ItemID=t.ItemID AND b.TransactionID=t.TransactionID group by hour(time) order by time;')
        rs = con.execute(query,beer=beer)
        results= [dict(row) for row in rs]
        for r in results:
                r['time'] = str(r['time'])
        return results
        #json.dumps(r, indent=4, sort_keys=True, default=str)
        


def get_allDrinkers():
    with engine.connect() as con:
        rs = con.execute("SELECT DrinkerName from DrinkerTable;")
        return [dict(row) for row in rs]

def get_spending(name):
    with engine.connect() as con:
        query = sql.text("select BarName, t.TransactionID, time from BillsTable b, DrinkerTable d, TransactionTable t, BarTable b1 \
        where d.DrinkerName=:name AND d.DrinkerID=t.DrinkerID AND t.TransactionID=b.TransactionID AND b1.BarLicense=t.BarLicense group by t.BarLicense order by time;")
        rs=con.execute(query,name=name)
        results=[dict(row) for row in rs]
        for r in results:
                r['time'] = str(r['time'])
        return results

def get_sells(name):
    with engine.connect() as con:
        query=sql.text("Select D.DrinkerName,B.totalCost from DrinkerTable D,BillsTable B limit 10 ")

        rs = con.execute(query,name=name)
        return [dict(row) for row in rs]

def find_bar(name):
    with engine.connect() as con:
        query = sql.text(
            "SELECT * FROM BarTable WHERE BarName = :name;"
        )

        rs = con.execute(query, name=name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)

def filter_beers(max_price):
    with engine.connect() as con:
        query = sql.text(
            "SELECT * FROM sells WHERE price < :max_price;"
        )

        rs = con.execute(query, max_price=max_price)
        results = [dict(row) for row in rs]
        for r in results:
            r['price'] = float(r['price'])
        return results


def get_bar_menu(bar_license):
    with engine.connect() as con:
        query = sql.text(
            "SELECT * from SellsTable where BarLicense = 'BL127';"
        )
        rs = con.execute(query,bar_license)
        results = [dict(row) for row in rs]
        return results
        #for i, _ in enumerate(results):
           # results[i]['Price'] = float(results[i]['Price'])
        


def get_bars_selling(beer):
    with engine.connect() as con:
        query = sql.text('select w.BarName from \
                        (select BarName, SUM(Quantity) as finalQ from ItemsTable i, TransactionTable t, BarTable B \
                        where i.name= :beer AND i.ItemID=t.ItemID and t.BarLicense=B.BarLicense group by BarName order by finalQ DESC) w limit 10;')
        rs = con.execute(query, beer=beer)
        results = [dict(row) for row in rs]
        return results
        #for i, _ in enumerate(results):
           # results[i]['price'] = float(results[i]['price'])
        
def get_beerPageGraph(beer):
    with engine.connect() as con:
        query = sql.text('SELECT DrinkerID, count(*) as frequentCount \
                FROM FrequentTable \
                GROUP BY BarLicense; \
            ')
        rs = con.execute(query)
        results = [dict(row) for row in rs]
        return results


def get_bar_frequent_counts(): #this is fake graph
    with engine.connect() as con:
        query = sql.text('SELECT DrinkerID, count(*) as frequentCount \
                FROM FrequentTable \
                GROUP BY BarLicense; \
            ')
        rs = con.execute(query)
        results = [dict(row) for row in rs]
        return results


def get_bar_cities():
    with engine.connect() as con:
        rs = con.execute('SELECT DISTINCT city FROM bars;')
        return [row['city'] for row in rs]


"""Gets a list of beer names from the beers table."""
def get_beers():
    with engine.connect() as con:
        rs = con.execute("SELECT name FROM ItemsTable where Flag='B';")
        return [dict(row) for row in rs]


def get_a_beer(beer):
    with engine.connect() as con:
        query=sql.text("select ItemID from ItemsTable  where name = :beer")
        rs = con.execute(query, beer=beer)
        results = [dict(row) for row in rs]
        return results


def get_drinkerForABeer(beer):
    with engine.connect() as con:
        query=sql.text('select DrinkerName from DrinkerTable d, \
        (select DrinkerID, SUM(Quantity) as finalQ from TransactionTable t, ItemsTable i \
        where i.name= :beer AND i.ItemID=t.ItemID group by DrinkerID order by finalQ DESC) s \
        where d.DrinkerID=s.DrinkerID limit 10;')
        rs = con.execute(query, beer=beer)
        result = [dict(row) for row in rs]
        return result


def get_drinkers():
    with engine.connect() as con:
        rs = con.execute('SELECT name, city, phone, addr FROM drinkers;')
        return [dict(row) for row in rs]


def get_likes(drinker_name):
    """Gets a list of beers liked by the drinker provided."""

    with engine.connect() as con:
        query = sql.text('SELECT beer FROM likes WHERE drinker = :name;')
        rs = con.execute(query, name=drinker_name)
        return [row['beer'] for row in rs]


def get_drinker_info(drinker_name):
    with engine.connect() as con:
        query = sql.text('SELECT * FROM drinkers WHERE name = :name;')
        rs = con.execute(query, name=drinker_name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)

def get_manufacturer():
    with engine.connect() as con:
        rs = con.execute("select Manf from ItemsTable where Flag='B';")
        return [dict(row) for row in rs]

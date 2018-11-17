from sqlalchemy import create_engine
from sqlalchemy import sql

import json
from BarBeerDrinker import config

engine = create_engine(config.database_uri)

def get_bars():
    with engine.connect() as con:
        rs = con.execute("SELECT * from BarTable;")
        return [dict(row) for row in rs]
def get_bartenders():
    with engine.connect() as con:
        rs = con.execute("SELECT BartenderName from BartenderTable;")
        return [dict(row) for row in rs]

def getBeerTime(beer):
    with engine.connect() as con:
        query=sql.text('select b.time as time ,SUM(Quantity) as finalQ from BillTable b, TransactionTable t, ItemsTable i \
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
def get_drinkerOrders(drinker,tid):
    with engine.connect() as con:
        query= sql.text("select name, Quantity, Total from ItemsTable i, TransactionTable t1, \
        (select t.ItemID as ItemID from TransactionTable t, DrinkerTable d \
        where d.DrinkerName=:drinker AND t.TransactionID=:tid) q1 \
        where q1.ItemID=i.ItemID AND q1.ItemID=t1.ItemID AND t1.TransactionID=:tid;")
        rs=con.execute(query,tid=tid,drinker=drinker)
        return [dict(row) for row in rs]

def get_spending(name):
    with engine.connect() as con:
        query = sql.text("select BarName, t.TransactionID, time from BillTable b, DrinkerTable d, TransactionTable t, BarTable b1 \
        where d.DrinkerName=:name AND d.DrinkerID=t.DrinkerID AND t.TransactionID=b.TransactionID AND b1.BarLicense=t.BarLicense group by t.BarLicense order by time;")
        rs=con.execute(query,name=name)
        results=[dict(row) for row in rs]
        for r in results:
                r['time'] = str(r['time'])
        return results

def get_sells(name):
    with engine.connect() as con:
        query=sql.text("Select D.DrinkerName,B.totalCost from DrinkerTable D,BillTable B limit 10 ")

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
        
def get_beerPageGraph(beer): #not really graph beer page final qury
    with engine.connect() as con:
        query = sql.text('select Time, SUM(Quantity) as finalQ from BillTable b, TransactionTable t, ItemsTable i \
        where i.name=:beer AND i.ItemID=t.ItemID AND b.TransactionID=t.TransactionID group by hour(Time) order by Time;')
        rs = con.execute(query,beer=beer)
        results = [dict(row) for row in rs]
        for r in results:
                r['Time'] = str(r['Time'])
                r['finalQ'] = str(r['finalQ'])
        return results


def get_bar_frequent_counts(): #this is fake insights graph
    with engine.connect() as con:
        query = sql.text('SELECT DrinkerID, count(*) as frequentCount \
                FROM FrequentTable \
                GROUP BY BarLicense; \
            ')
        rs = con.execute(query)
        results = [dict(row) for row in rs]
        return results

def get_drinkerPageGraph(name): #this is for drinker page second qury 
    with engine.connect() as con:
        query = sql.text('select name,Quantity from ItemsTable i, TransactionTable t, DrinkerTable d \
        where i.ItemID=t.ItemID AND d.DrinkerName=:name AND d.drinkerID=t.drinkerID limit 10;')
        rs = con.execute(query,name=name)
        results = [dict(row) for row in rs]
        for r in results:
                r['Quantity']=float(r['Quantity'])
        return results

def get_barPageQury1(name):
     with engine.connect() as con:
        query = sql.text('select DrinkerName, d1.finalQ as finalQ from DrinkerTable d, \
        (select t.DrinkerID, SUM(Total) finalQ from TransactionTable t, BarTable b \
        where b.BarName=:name AND t.BarLicense=b.BarLicense group by DrinkerID order by finalQ DESC limit 10) d1 \
        where d.DrinkerID=d1.DrinkerID;')
        rs = con.execute(query,name=name)
        results = [dict(row) for row in rs]
        for r in results:
                r['finalQ']=float(r['finalQ'])
        return results

def get_barPageQury2(barName,day):
     with engine.connect() as con:
        query = sql.text("select name, q3.finalQ as finalQ from ItemsTable i, \
        (select t1.ItemID as ItemID, SUM(Quantity) as finalQ from TransactionTable t1, \
        (select q.TransactionID as TID from BillTable b1, \
        (select TransactionID from BarTable b, TransactionTable t \
        where b.BarName=:barName AND b.BarLicense=t.BarLicense) q \
        where b1.TransactionID=q.TransactionID AND dayname(b1.Date)=:day) q2 \
        where q2.TID=t1.TransactionID group by t1.ItemID order by finalQ DESC) q3 \
        where q3.ItemID=i.ItemID AND i.Flag='B' limit 10;")
        rs = con.execute(query,barName=barName,day=day)
        results = [dict(row) for row in rs]
        for r in results:
                r['finalQ']=float(r['finalQ'])
        return results
def get_barPageQury3a(barName): #i think this is wrong
     with engine.connect() as con:
        query = sql.text("select Time, Count(b1.TransactionID) as Count from BillTable b1, \
        (select t.TransactionID as TransactionID from BarTable b, TransactionTable t \
        where b.BarName=:barName AND b.BarLicense=t.BarLicense)q \
        where q.TransactionID=b1.TransactionID group by b1.TransactionID order by Time;")
        rs = con.execute(query,barName=barName)
        results = [dict(row) for row in rs]
        for r in results:
                r['Time']=str(r['Time'])
        return results
def get_barPageQury3b(barName):#i think this is wrong
     with engine.connect() as con:
        query = sql.text("select dayname(Time) as theDay, week(Date) as theWeek ,Count(b1.TransactionID) as theCount from BillTable b1, \
        (select t.TransactionID as TransactionID from BarTable b, TransactionTable t \
        where b.BarName=:barName AND b.BarLicense=t.BarLicense)q \
        where q.TransactionID=b1.TransactionID group by b1.TransactionID order by week(Date);")
        rs = con.execute(query,barName=barName)
        results = [dict(row) for row in rs]
        return results
def get_barPageQury4(barName):
     with engine.connect() as con:
        query = sql.text("select Quantity from SellsTable limit 10 ")
        rs = con.execute(query,barName=barName)
        results = [dict(row) for row in rs]
        for r in results:
                if (r['Quantity'] !='null') :
                        r['Quantity']=float(r['Quantity'])
                else:
                        r['Quantity']=0
        return results
def get_barPageQury5(beerName,day):
     with engine.connect() as con:
        query = sql.text("select * from SellsTable limit 10 ")
        rs = con.execute(query,beerName=beerName,day=day)
        results = [dict(row) for row in rs]
        return results

def get_drinkerPageQury3(drinkerName,barName):
  with engine.connect() as con:
        query = sql.text('select BillID, b1.TransactionID, Total, date(Date) as Date from BillTable b1, \
        (select TransactionID, ItemID,t.BarLicense  from TransactionTable t, DrinkerTable d, BarTable b \
        where d.DrinkerName=:drinkerName AND d.DrinkerID=t.DrinkerID AND b.BarName=:barName AND b.BarLicense=t.BarLicense) q \
        where b1.TransactionID=q.TransactionID group by Date order by date(Date);')
        rs = con.execute(query,barName=barName,drinkerName=drinkerName)
        results = [dict(row) for row in rs]
        return results
def get_drinkerPageQury3Weeks(drinkerName,barName):
  with engine.connect() as con:
        query = sql.text('select BillID, b1.TransactionID, Total, week(Date) as Week from BillTable b1, \
        (select TransactionID, ItemID,t.BarLicense  from TransactionTable t, DrinkerTable d, BarTable b \
        where d.DrinkerName=:drinkerName AND d.DrinkerID=t.DrinkerID AND b.BarName=:barName AND b.BarLicense=t.BarLicense) q \
        where b1.TransactionID=q.TransactionID group by Week order by week(Date);')
        rs = con.execute(query,barName=barName,drinkerName=drinkerName)
        results = [dict(row) for row in rs]
        return results
def get_drinkerPageQury3Months(drinkerName,barName):
  with engine.connect() as con:
        query = sql.text('select BillID, b1.TransactionID, Total, month(Date) as Month from BillTable b1, \
        (select TransactionID, ItemID,t.BarLicense  from TransactionTable t, DrinkerTable d, BarTable b \
        where d.DrinkerName=:drinkerName AND d.DrinkerID=t.DrinkerID AND b.BarName=:barName AND b.BarLicense=t.BarLicense) q \
        where b1.TransactionID=q.TransactionID group by Month order by month(Date);')
        rs = con.execute(query,barName=barName,drinkerName=drinkerName)
        results = [dict(row) for row in rs]
        return results


def get_allManfs():
  with engine.connect() as con:
        query = sql.text('select Manf from ItemsTable where Flag="B";')
        rs = con.execute(query)
        results = [dict(row) for row in rs]
        return results

def get_manfPageQury1(manfName):
  with engine.connect() as con:
        query = sql.text('select City, State, q3.finalQ as Sales from BarTable b4, \
        (select BarLicense, SUM(Total) as finalQ from TransactionTable t2, \
        (select q.TransactionID as TID from BillTable b, (select TransactionID from TransactionTable t, ItemsTable i \
        where i.Manf=:manfName AND t.ItemID=i.ItemID)q \
        where q.TransactionID=b.TransactionID AND b.Date between adddate(now(),-7) and now()) q2 \
        where t2.TransactionID=q2.TID group by BarLicense order by finalQ) q3 \
        where q3.BarLicense=b4.BarLicense limit 10;') 
        rs = con.execute(query,manfName=manfName)
        results = [dict(row) for row in rs]
        for r in results:
            r['Sales'] = float(r['Sales'])
        return results
def get_manfPageQuryStates(manfName): #check this one for sure!!!! this shit is wrong 
  with engine.connect() as con:
        query = sql.text('select City, State, q3.finalQ from BarTable b2, \
        (select BarLicense, SUM(Quantity) as finalQ from TransactionTable t1, \
        (select q1.TransactionID as TID from BillTable b, \
        (select TransactionID from TransactionTable t, \
        (select DrinkerID, i.ItemID as ItemID from ItemsTable i, LikesTable l \
        where i.Manf=:manfName AND i.ItemID=l.ItemID) q \
        where t.DrinkerID=q.DrinkerID AND t.ItemID=q.ItemID) q1 \
        where b.TransactionID=q1.TransactionID and b.Date between adddate(now(),-7) and now()) q2 \
        where t1.TransactionID=q2.TID group by BarLicense order by finalQ) q3 \
        where b2.BarLicense=q3.BarLicense limit 10;')
        rs = con.execute(query,manfName=manfName)
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

from sqlalchemy import create_engine
from sqlalchemy import sql

import json
from BarBeerDrinker import config

engine = create_engine(config.database_uri)

def get_TransTable():
    with engine.connect() as con:
        rs = con.execute("SELECT * from TransactionTable;")
        results= [dict(row) for row in rs]
        return results

def get_SellsTable():
    with engine.connect() as con:
        rs = con.execute("SELECT * from SellsTable;")
        results= [dict(row) for row in rs]
        return results
def get_works():
    with engine.connect() as con:
        rs = con.execute("SELECT * from Works;")
        results= [dict(row) for row in rs]
        return results

def get_ops():
    with engine.connect() as con:
        rs = con.execute("SELECT * from Operation;")
        results= [dict(row) for row in rs]
        return results
def get_Likes():
    with engine.connect() as con:
        rs = con.execute("SELECT * from LikesTable;")
        results= [dict(row) for row in rs]
        return results

def get_Freq():
    with engine.connect() as con:
        rs = con.execute("SELECT * from FrequentTable;")
        results= [dict(row) for row in rs]
        return results
def get_allBills():
    with engine.connect() as con:
        rs = con.execute("SELECT * from BillTable;")
        results= [dict(row) for row in rs]
        for r in results:
                r['Time'] = str(r['Time'])
                r['DateTime'] = str(r['DateTime'])
        return results
def get_allItems():
    with engine.connect() as con:
        rs = con.execute("SELECT * from ItemsTable;")
        return [dict(row) for row in rs]
def get_bars():
    with engine.connect() as con:
        rs = con.execute("SELECT * from BarTable;")
        return [dict(row) for row in rs]
def get_bartenders():
    with engine.connect() as con:
        rs = con.execute("SELECT * from BartenderTable;")
        return [dict(row) for row in rs]
def get_bartendersShifts():
    with engine.connect() as con:
        rs = con.execute("SELECT distinct Start,Close from Works")
        results= [dict(row) for row in rs]
        for r in results:
                r['Start'] = str(r['Start'])
                r['Close'] = str(r['Close'])
        return results
        

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
        rs = con.execute("SELECT * from DrinkerTable;")#made change now i select all fields instead of drinkerName
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
        where i.ItemID=t.ItemID AND d.DrinkerName=:name AND d.drinkerID=t.drinkerID and i.Flag="B" limit 10;')
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
        query = sql.text("select q2.Day as Day,(q2.finalQ/(q4.finalQ3+q2.finalQ)) as fraction from \
        (select SUM(q.finalQ2) as finalQ3 from \
        (select s.BarLicense, s.ItemID, Quantity as finalQ2 from SellsTable s, \
        (select b.BarLicense as BarLicense, i.ItemID from BarTable b, TransactionTable t2, ItemsTable i \
        where b.BarName='Rahil Pub' and b.BarLicense=t2.BarLicense and t2.ItemID=i.ItemID and i.Flag='B' order by ItemID) b5 \
        where s.BarLicense=b5.BarLicense AND s.ItemID=b5.ItemID) q) q4, \
        (select dayname(b1.Date) as Day, t1.TransactionID, SUM(Quantity) as finalQ from ItemsTable i, TransactionTable t1, BillTable b1, \
        (select TransactionID, ItemID from BarTable b, TransactionTable t  where b.BarName='Rahil Pub' AND b.BarLicense=t.BarLicense) q \
        where q.ItemID=i.ItemID AND i.Flag='B' AND b1.TransactionID=q.TransactionID \
        AND (b1.Date between adddate(now(),-7) and now()) group by day(b1.Date)) q2;")
        rs = con.execute(query,barName=barName)
        results = [dict(row) for row in rs]
        for r in results:
                r['fraction']=float(r['fraction'])
        return results

def get_barPageQury5(beerName,day):
     with engine.connect() as con:
        query = sql.text("(select BarName, q2.finalQ from BarTable b2, \
        (select BarLicense, SUM(Total) as finalQ from TransactionTable t1, \
        (select b.TransactionID as TID, t.ItemID as IID from ItemsTable i, TransactionTable t, BillTable b \
        where i.name=:beerName AND i.ItemID=t.ItemID AND t.TransactionID=b.TransactionID AND dayname(b.Date)=:day) q \
        where q.TID=t1.TransactionID AND t1.ItemID=q.IID group by BarLicense order by finalQ) q2 \
        where b2.BarLicense=q2.BarLicense) limit 10 ")
        rs = con.execute(query,beerName=beerName,day=day)
        results = [dict(row) for row in rs]
        return results
def get_bartenderPageQury1(bar,tender):
     with engine.connect() as con:
        query = sql.text("select q1.Start as Start, q1.Close as Close, i.name as Name, q1.finalQ as finalQ from ItemsTable i, \
        (select b1.DateTime, w.Start as Start, w.Close as CLose, t2.ItemID as ItemID, SUM(Quantity) as finalQ from Works w, BillTable b1, TransactionTable t2, \
        (select t.TransactionID as TID, t.BartenderID as BID from BartenderTable b, BarTable b1, TransactionTable t \
        where b.BartenderName=:tender AND b.BartenderID=t.BartenderID AND b1.BarName=:bar \
        AND b1.BarLicense=t.BarLicense) q \
        where q.TID=b1.TransactionID AND dayname(b1.Date)=w.Day AND b1.DateTime < now() AND w.BartenderID=q.BID \
        AND w.Start<=b1.Time AND w.Close >= b1.Time AND b1.TransactionID=t2.TransactionID group by t2.ItemID order by finalQ) q1 \
        where i.ItemID=q1.ItemID AND i.Flag='B';")
        rs = con.execute(query,bar=bar,tender=tender)
        results = [dict(row) for row in rs]
        return results
def get_bartenderPageQury2(bar,StartTime,CloseTime,Day):
     with engine.connect() as con:
        query = sql.text("select BartenderName, q4.finalQ from BartenderTable b5, \
        (select q1.BartenderID, SUM(Quantity) as finalQ from TransactionTable t2, \
        (select q.TransactionID as TransactionID ,q.BartenderID as BartenderID, q.ItemID from Works w, \
        (select TransactionID, t.BartenderID as BartenderID, t.ItemID as ItemID from BarTable b, TransactionTable t, ItemsTable i \
        where b.BarName='Mysterious Falcon Bar' AND b.BarLicense=t.BarLicense AND i.Flag='B' AND i.ItemID=t.ItemID) q \
        where w.Day='Fri' AND q.BartenderID=w.BartenderID AND Start='08:00:00' AND Close='23:00:00') q1 \
        where t2.BartenderID=q1.BartenderID AND t2.TransactionID=q1.TransactionID AND t2.ItemID=q1.ItemID group by q1.BartenderID order by finalQ) q4 \
        where q4.BartenderID=b5.BartenderID;")
        rs = con.execute(query,bar=bar,StartTime=StartTime,CloseTime=CloseTime,Day=Day)
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
        query = sql.text('select City, State, q3.finalQ as Sales from BarTable b2, \
        (select BarLicense, SUM(Quantity) as finalQ from TransactionTable t1, ItemsTable i2, \
        (select q1.TransactionID as TID from BillTable b, \
        (select TransactionID, q.DrinkerID, q.ItemID from TransactionTable t, \
        (select DrinkerID, i.ItemID as ItemID from ItemsTable i, LikesTable l \
        where i.Manf=:manfName AND i.ItemID=l.ItemID) q \
        where t.DrinkerID=q.DrinkerID AND t.ItemID=q.ItemID) q1 \
        where b.TransactionID=q1.TransactionID and b.Date between adddate(now(),-7) and now()) q2 \
        where t1.TransactionID=q2.TID AND i2.Manf=:manfName AND i2.ItemID=t1.ItemID group by BarLicense order by finalQ) q3 \
        where b2.BarLicense=q3.BarLicense limit 10;')
        rs = con.execute(query,manfName=manfName)
        results = [dict(row) for row in rs]
        for r in results:
            r['Sales'] = float(r['Sales'])
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

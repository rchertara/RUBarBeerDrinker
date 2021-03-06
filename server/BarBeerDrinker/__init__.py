from flask import Flask
from flask import jsonify
from flask import make_response
from flask import request
import json

from BarBeerDrinker import database

app = Flask(__name__)

@app.route('/api/get_TransTable', methods=["GET"])
def get_TransTable():
    return jsonify(database.get_TransTable())

@app.route('/api/get_SellsTable', methods=["GET"])
def get_SellsTable():
    return jsonify(database.get_SellsTable())

@app.route('/api/get_works', methods=["GET"])
def get_works():
    return jsonify(database.get_works())

@app.route('/api/get_ops', methods=["GET"])
def get_ops():
    return jsonify(database.get_ops())

@app.route('/api/get_Likes', methods=["GET"])
def get_Likes():
    return jsonify(database.get_Likes())

@app.route('/api/get_Freq', methods=["GET"])
def get_Freq():
    return jsonify(database.get_Freq())

@app.route('/api/get_Bills', methods=["GET"])
def get_allBills():
    return jsonify(database.get_allBills())

@app.route('/api/get_Items', methods=["GET"])
def get_allItems():
    return jsonify(database.get_allItems())
@app.route('/api/manufacturer_page', methods=["GET"])
def get_allManfs():
    return jsonify(database.get_allManfs())
@app.route('/api/manufacturer_page/<name>', methods=["GET"])
def get_allStatesForManf(name):
    return jsonify(database.get_manfPageQury1(name))

@app.route('/api/manufacturer_pageLikesStates/<name>', methods=["GET"])
def get_manfLikesState(name):
    return jsonify(database.get_manfPageQuryStates(name))

@app.route('/api/bartender_page', methods=["GET"])
def get_allBartenders():
    return jsonify(database.get_bartenders())

@app.route('/api/bar', methods=["GET"])
def get_bars():
    return jsonify(database.get_bars())

@app.route('/api/drinker_page', methods=["GET"])
def get_allDrinkers():
    return jsonify(database.get_allDrinkers())

@app.route("/api/drinker_page/<name>", methods=["GET"])
def get_spending(name):
    return jsonify(database.get_spending(name))

@app.route("/api/drinker_pageGraph/<name>", methods=["GET"])
def get_drinkerPageGraph(name):
    return jsonify(database.get_drinkerPageGraph(name))


@app.route('/api/bar-spendings/<drinkerName>/<barName>', methods=["GET"]) 
def get_drinkerPageQury3(drinkerName,barName):
    try:
        return jsonify(database.get_drinkerPageQury3(drinkerName,barName))
    except Exception as e:
        return make_response(str(e), 500)
@app.route('/api/bar-spendingsWeeks/<drinkerName>/<barName>', methods=["GET"]) 
def get_drinkerPageQury3Weeks(drinkerName,barName):
    try:
        return jsonify(database.get_drinkerPageQury3Weeks(drinkerName,barName))
    except Exception as e:
        return make_response(str(e), 500)
@app.route('/api/bar-spendingsMonths/<drinkerName>/<barName>', methods=["GET"]) 
def get_drinkerPageQury3Months(drinkerName,barName):
    try:
        return jsonify(database.get_drinkerPageQury3Months(drinkerName,barName))
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/transaction/<drinker>/<tid>", methods=["GET"])
def get_drinkerOrders(drinker,tid):
    return jsonify(database.get_drinkerOrders(drinker,tid))

@app.route('/api/bars/<barName>', methods=['GET']) #bar Page qury 1
def get_barPageQury1(barName):
    try:
        return jsonify(database.get_barPageQury1(barName))
    except Exception as e:
        return make_response(str(e), 500)
@app.route('/api/bars/<barName>/<day>', methods=['GET']) #bar Page qury 2
def get_barPageQury2(barName,day):
    try:
        return jsonify(database.get_barPageQury2(barName,day))
    except Exception as e:
        return make_response(str(e), 500)
@app.route('/api/bars3a/<barName>', methods=['GET']) #bar Page qury 3a
def get_barPageQury3a(barName):
    try:
        return jsonify(database.get_barPageQury3a(barName))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bars3b/<barName>',methods=['GET']) #bar Page qury 3b
def get_barPageQury3b(barName):
    try:
        return jsonify(database.get_barPageQury3b(barName))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bars4/<barName>',methods=['GET']) #bar Page qury 4
def get_barPageQury4(barName):
    try:
        return jsonify(database.get_barPageQury4(barName))
    except Exception as e:
        return make_response(str(e), 500)
@app.route('/api/bars5/<beerName>/<day>',methods=['GET']) #bar Page qury 4
def get_barPageQury5(beerName,day):
    try:
        return jsonify(database.get_barPageQury5(beerName,day))
    except Exception as e:
        return make_response(str(e), 500)
@app.route('/api/bartender1/<bar>/<bartender>',methods=['GET']) #bar
def get_bartenderPageQury1(bar,bartender):
    try:
        return jsonify(database.get_bartenderPageQury1(bar,bartender))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bartender_pageShifts',methods=['GET']) #bar
def get_bartenderPageShift():
    try:
        return jsonify(database.get_bartendersShifts())
    except Exception as e:
        return make_response(str(e), 500)

         #return this.http.get<any[]>('/api/bartender2/'+bar+'/'+shifts[0]+'/'+shifts[1]+'/'+day);

@app.route('/api/bartender2/<bar>/<Start>/<Close>/<day>',methods=['GET']) #bar
def get_bartenderPageQury2(bar,Start,Close,day):
    try:
        return jsonify(database.get_bartenderPageQury2(bar,Start,Close,day))
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/bar/<name>", methods=["GET"])
def find_bar(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)




@app.route("/api/beers_cheaper_than", methods=["POST"])
def find_beers_cheaper_than():
    body = json.loads(request.data)
    max_price = body['maxPrice']
    return jsonify(database.filter_beers(max_price))


@app.route('/api/menu/<name>', methods=['GET'])
def get_menu(name):
    return jsonify(database.get_sells(name))




@app.route("/api/bar-cities", methods=["GET"])
def get_bar_cities():
    try:
        return jsonify(database.get_bar_cities())
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/beer", methods=["GET"])
def get_beers():
    try:
        return jsonify(database.get_beers())
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/beers/<beerName>", methods=["GET"])
def get_drinkerForABeer(beerName):
    try:
       return jsonify(database.get_drinkerForABeer(beerName))
        #return jsonify(database.get_beer_manufacturers(None))
    except Exception as e:
        return make_response(str(e), 500)





@app.route("/api/likes", methods=["GET"])
def get_likes():
    try:
        drinker = request.args.get("drinker")
        if drinker is None:
            raise ValueError("Drinker is not specified.")
        return jsonify(database.get_likes(drinker))
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/drinker", methods=["GET"])
def get_drinkers():
    try:
        return jsonify(database.get_drinkers())
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/drinker/<name>", methods=["GET"])
def get_drinker(name):
    try:
        if name is None:
            raise ValueError("Drinker is not specified.")
        return jsonify(database.get_drinker_info(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)
        


@app.route('/api/bars-selling/<beer>', methods=['GET'])
def find_bars_selling(beer):
    try:
        if beer is None:
            raise ValueError('Beer not specified')
        return jsonify(database.get_bars_selling(beer))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)


@app.route('/api/frequents-data', methods=['GET'])
def get_bar_frequent_counts():
    try:
        return jsonify(database.get_bar_frequent_counts())
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/beers-time/<beer>', methods=['GET'])
def get_beerPageGraph(beer):
    try:
        return jsonify(database.get_beerPageGraph(beer))
    except Exception as e:
        return make_response(str(e), 500)



@app.route('/api/beer/<beer>', methods=['GET'])
def get_BeerTime(beer):
    try:
        if beer is None:
            raise ValueError('Beer not specified')
        return jsonify(database.getBeerTime(beer))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/manufacturer', methods=['GET'])
def get_manufacturer():
    return jsonify(database.get_manufacturer())
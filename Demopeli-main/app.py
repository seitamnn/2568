import json
import os
import random

import mysql.connector
from dotenv import load_dotenv
from flask import Flask, request, Response
from flask_cors import CORS

import config
from game import Game

load_dotenv()

app = Flask(__name__)
# lisätty cors
# cors = ()
CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

# Tietokantayhteys
config.conn = mysql.connector.connect(
         host=os.environ.get('HOST'),
         port= 3306,
         database=os.environ.get('DB_NAME'),
         user=os.environ.get('DB_USER'),
         password=os.environ.get('DB_PASS'),
         autocommit=True
         )

def fly(id, dest, consumption=0, player=None):
    if id==0:
        game = Game(0, dest, consumption, player)
    else:
        game = Game(id, dest, consumption)
    game.location[0].fetchWeather(game)
    nearby = game.location[0].find_nearby_airports()
    for a in nearby:
        game.location.append(a)
    json_data = json.dumps(game, default=lambda o: o.__dict__, indent=4)
    return json_data


# http://127.0.0.1:5000/flyto?game=fEC7n0loeL95awIxgY7M&dest=EFHK&consumption=123
@app.route('/flyto')
def flyto():
    args = request.args
    id = args.get("game")
    dest = args.get("dest")
    consumption = args.get("consumption")
    json_data = fly(id, dest, consumption)
    print("*** Called flyto endpoint ***")
    return json_data


# http://127.0.0.1:5000/newgame?player=Vesa&loc=EFHK
@app.route('/newgame')
def newgame():
    args = request.args
    player = args.get("player")
    dest = args.get("loc")
    json_data = fly(0, dest, 0, player)
    return json_data


@app.route('/player_info/<screen_name>/')
def user_currency_distance(screen_name):
    try:
        sql = (f"SELECT currency, alien_distance, location, in_possession FROM game WHERE screen_name = '{screen_name}'")
        cursor = config.conn.cursor()
        cursor.execute(sql)
        userdata = cursor.fetchall()
        status_code = 200
        player_info = {
            "currency": userdata[0][0],
            "alien_distance": userdata[0][1],
            "location": userdata[0][2],
            "in_possession": userdata[0][3]
        }
    except ValueError:
        status_code = 400
        player_info = {
            "status": status_code,
            "message": "Invalid input"
        }

    json_response = json.dumps(player_info)
    return Response(response=json_response, status=status_code, mimetype='application/json')

@app.route('/select_airport/')
def select_airport():
    try:
        sql = f"SELECT airport.name, country.name FROM airport JOIN country ON airport.iso_country = country.iso_country WHERE country.name != 'Norway'"
        cursor = config.conn.cursor()
        cursor.execute(sql)
        airports = cursor.fetchall()
        three_airports = random.sample(airports, 3)
        status_code = 200
        airport_choices = {
            "airport1": [three_airports[0][0], three_airports[0][1]],
            "airport2": [three_airports[1][0], three_airports[1][1]],
            "airport3": [three_airports[2][0], three_airports[2][1]]
        }
    except ValueError:
        status_code = 400
        airport_choices = {
            "status_code": status_code,
            "message": "Invalid input"
        }
    json_response = json.dumps(airport_choices)
    return Response(response=json_response, status=status_code, mimetype='application/json')


@app.route('/select_norway/')
def select_airport_norway():
    try:
        sql = f"SELECT airport.name, country.name FROM airport JOIN country ON airport.iso_country = country.iso_country WHERE country.name = 'Norway'"
        cursor = config.conn.cursor()
        cursor.execute(sql)
        norway = cursor.fetchone()
        status_code = 200
        norway_airport = {
            "airport": norway[0],
            "country": norway[1]
        }
    except ValueError:
        status_code = 400
        norway_airport = {
            "status_code": status_code,
            "message": "Invalid input"
        }
    json_response = json.dumps(norway_airport)
    return Response(response=json_response, status=status_code, mimetype='application/json')


@app.route('/select_cuba/')
def select_airport_cuba():
    try:
        sql = f"SELECT airport.name, country.name FROM airport JOIN country ON airport.iso_country = country.iso_country WHERE country.name = 'Cuba'"
        cursor = config.conn.cursor()
        cursor.execute(sql)
        cuba = cursor.fetchone()
        status_code = 200
        cuba_airport = {
            "airport": cuba[0],
            "country": cuba[1]
        }
    except ValueError:
        status_code = 400
        cuba_airport = {
            "status_code": status_code,
            "message": "Invalid input"
        }
    json_response = json.dumps(cuba_airport)
    return Response(response=json_response, status=status_code, mimetype='application/json')


@app.errorhandler(404)
def not_found(error):
    response = {
        "status": error.status_code,
        "teksti": error.message
    }
    json_response = json.dumps(response)
    return Response(response=json_response, status=error.status_code, mimetype='application/json')



if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)

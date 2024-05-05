import json
import os
import random
import uuid

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

def fly(id, dest, consumption=0, player=None): #ei käytössä, voi poistaa jollei keksi käyttöä
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

def select_airport(): #valitaan kolme kenttää randomilla
    sql = f"SELECT airport.name, airport.latitude_deg, airport.longitude_deg, country.name FROM airport JOIN country ON airport.iso_country = country.iso_country"
    cursor = config.conn.cursor()
    cursor.execute(sql)
    airports = cursor.fetchall()
    three_airports = random.sample(airports, 3)
    airport_choices = [
        {"airport_name": three_airports[0][0],
         "country_name": three_airports[0][3],
         "longitude": three_airports[0][2],
         "latitude": three_airports[0][1]
         },
        {"airport_name": three_airports[1][0],
         "country_name": three_airports[1][3],
         "longitude": three_airports[1][2],
         "latitude": three_airports[1][1]
         },
        {"airport_name": three_airports[2][0],
         "country_name": three_airports[2][3],
         "longitude": three_airports[2][2],
         "latitude": three_airports[2][1]
         }
    ]
    return airport_choices

def player_info(screen_name): #pelaajan tiedot
    sql = (
        f"SELECT screen_name, currency, alien_distance, location, in_possession FROM game WHERE screen_name = '{screen_name}'")
    cursor = config.conn.cursor()
    cursor.execute(sql)
    userdata = cursor.fetchall()
    player_data = {
        "screen_name": userdata[0][0],
        "currency": userdata[0][1],
        "alien_distance": userdata[0][2],
        "location": userdata[0][3],
        "in_possession": userdata[0][4]
    }
    sql2 = (
        f"SELECT airport.name, airport.latitude_deg, airport.longitude_deg, country.name FROM airport JOIN country ON airport.iso_country = country.iso_country WHERE ident='{userdata[0][3]}'")
    cursor.execute(sql2)
    current_airport = cursor.fetchall()
    player_location = {
        "airport_name": current_airport[0][0],
        "airport_latitude": current_airport[0][1],
        "airport_longitude": current_airport[0][2],
        "country_name": current_airport[0][3]
    }
    status = {"playerInfo": player_data, "airport": select_airport(), "currentLocation": player_location}
    return status


def flyto(screen_name, dest, price): #lennetään
    sql2 = f"UPDATE game SET location = (SELECT ident FROM airport WHERE name = '{dest}') WHERE screen_name = '{screen_name}';"
    cursor = config.conn.cursor()
    cursor.execute(sql2)
    sql3 = f"UPDATE game SET currency = currency - '{price}' WHERE screen_name = '{screen_name}'"
    cursor.execute(sql3)
    return player_info(screen_name)


def start(screen_name): #tää käyttöön, kun saadaan pelaajan syöttämä nimi talteen
    def generate_player_id():
        return str(uuid.uuid4())
    mycursor = config.conn.cursor()
    sql = f"INSERT INTO game (id, location, screen_name, currency, alien_distance, in_possession) VALUES (%s, %s, %s, %s, %s,%s)" #noihin laitetaa arvot jotka annetaa seuraavalla rivillä
    mycursor.execute(sql, (generate_player_id(), 'MUHA', screen_name, 900, 6, False))  # MUHA = José Martí International Airport
    mycursor.fetchall()
    return flyto(screen_name, "José Martí International Airport", 0)

def update_possession(screen_name):
    sql = f"UPDATE game SET in_possession = true WHERE screen_name = '{screen_name}'"
    cursor = config.conn.cursor()
    cursor.execute(sql)

# http://127.0.0.1:5000/newgame?player=Vesa&loc=EFHK
@app.route('/newgame') # tää käyttöön kun saadaan pelaajan täyttämä nimi talteen
def newgame():
    args = request.args
    player = args.get("player")
    return start(player)


# http://127.0.0.1:5000/fly_to?playerName=fEC7n0loeL95awIxgY7M&dest=EFHK&price=10
@app.route('/fly_to') #käytössä, kun lennetään
def fly_to():
    args = request.args
    screen_name = args.get("playerName")
    dest = args.get("dest")
    price = int(args.get("price"))
    return flyto(screen_name, dest, price)

@app.route('/ingredient') #päivitetään ainesosa
def update_in_possession():
    args = request.args
    screen_name = args.get("playerName")
    update_possession(screen_name)
    return player_info(screen_name)

@app.route('/player_info/<screen_name>/') # pelaajan tiedot haetaan tällä
def player_test(screen_name):
    return player_info(screen_name)


if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)

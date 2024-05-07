import os
import random
import uuid

import mysql.connector
from dotenv import load_dotenv
from flask import Flask, request, Response
from flask_cors import CORS

import config

load_dotenv()

app = Flask(__name__)
# lisätty cors
# cors = ()
CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

# Tietokantayhteys
config.conn = mysql.connector.connect(
         host=os.environ.get('HOST'),
         port=3306,
         database=os.environ.get('DB_NAME'),
         user=os.environ.get('DB_USER'),
         password=os.environ.get('DB_PASS'),
         autocommit=True
         )

whenEnoughFlights = 0
def select_airport():
    global whenEnoughFlights
    if whenEnoughFlights != 3 and whenEnoughFlights != 6:
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
    elif whenEnoughFlights == 2:
        # When enough flights have been made, only Norway should be selectable
        sql = f"SELECT airport.name, airport.latitude_deg, airport.longitude_deg, country.name FROM airport JOIN country ON airport.iso_country = country.iso_country WHERE country.name = 'Norway'"
        cursor = config.conn.cursor()
        cursor.execute(sql)
        norwayAirport = cursor.fetchall()
        airport_choices = [
            {"airport_name": norwayAirport[0][0],
             "country_name": norwayAirport[0][3],
             "longitude": norwayAirport[0][2],
             "latitude": norwayAirport[0][1]
             }
        ]
    else:
        # When enough flights have been made, only Norway should be selectable
        sql = f"SELECT airport.name, airport.latitude_deg, airport.longitude_deg, country.name FROM airport JOIN country ON airport.iso_country = country.iso_country WHERE country.name = 'Cuba'"
        cursor = config.conn.cursor()
        cursor.execute(sql)
        cubaAirport = cursor.fetchall()
        airport_choices = [
            {"airport_name": cubaAirport[0][0],
             "country_name": cubaAirport[0][3],
             "longitude": cubaAirport[0][2],
             "latitude": cubaAirport[0][1]
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


def flyto(screen_name, dest, price):
    global whenEnoughFlights
    sql2 = f"UPDATE game SET location = (SELECT ident FROM airport WHERE name = '{dest}') WHERE screen_name = '{screen_name}';"
    cursor = config.conn.cursor()
    cursor.execute(sql2)
    sql3 = f"UPDATE game SET currency = currency - '{price}' WHERE screen_name = '{screen_name}'"
    cursor.execute(sql3)
    whenEnoughFlights += 1
    return player_info(screen_name)


def start(screen_name): #tää käyttöön, kun saadaan pelaajan syöttämä nimi talteen
    def generate_player_id():
        return str(uuid.uuid4())
    mycursor = config.conn.cursor()
    sql = f"INSERT INTO game (id, location, screen_name, currency, alien_distance, in_possession) VALUES (%s, %s, %s, %s, %s,%s)" #noihin laitetaa arvot jotka annetaa seuraavalla rivillä
    mycursor.execute(sql, (generate_player_id(), 'MUHA', screen_name, 50, 6, False))  # MUHA = José Martí International Airport
    mycursor.fetchall()
    return flyto(screen_name, "José Martí International Airport", 0)


def update_possession(screen_name):
    sql = f"UPDATE game SET in_possession = true WHERE screen_name = '{screen_name}'"
    cursor = config.conn.cursor()
    cursor.execute(sql)


def update_currency(screen_name):
    sql = f"UPDATE game SET currency = currency + 50 WHERE screen_name = '{screen_name}'"
    cursor = config.conn.cursor()
    cursor.execute(sql)


def update_distance(screen_name):
    sql = f"UPDATE game SET alien_distance = alien_distance - 1 WHERE screen_name = '{screen_name}'"
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


@app.route('/correct_answer') #jos vastaa oikein kyssäriin
def correct_answer():
    args = request.args
    screen_name = args.get("playerName")
    update_currency(screen_name)
    return player_info(screen_name)


@app.route('/wrong_answer') #jos vastaa väärin
def wrong_answer():
    args = request.args
    screen_name = args.get("playerName")
    update_distance(screen_name)
    return player_info(screen_name)


if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)

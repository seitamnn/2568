# tähän challenget jeejee
import json
import os
import random

import mysql.connector
from countryinfo import CountryInfo
from dotenv import load_dotenv
from flask import Flask, request, Response
from flask_cors import CORS

import config
from game import Game

import countryinfo

load_dotenv()

app = Flask(__name__)

CORS(app)

config.conn = mysql.connector.connect(
         host=os.environ.get('HOST'),
         port= 3306,
         database=os.environ.get('DB_NAME'),
         user=os.environ.get('DB_USER'),
         password=os.environ.get('DB_PASS'),
         autocommit=True
         )

# currency convert
@app.route('/challenge1/<screen_name>/')
def challenge1(screen_name):
    try:
        title = 'You are in your own thoughts when accidentally bump into strange looking world traveler at the airport. He asks for your help with the currency conversion and you decide to help him. Let\'s see what kind of problem he has.'
        question = 'How much is 10 euros in yens?'
        answer = '1630'
        right_answer = 'That\'s right! The traveler is very grateful and gives you some currency for the effort. You got 10$, hooray!'
        wrong_answer = 'Oh no, the traveler fooled you. He was thief who took some currency from your pocket. By chance he didn\'t get your wallet though. You lost 20$'
    except ValueError:
        status_code = 400
        cuba_airport = {
            "status_code": status_code,
            "message": "Invalid input"
        }

# recognized
@app.route('/challenge2/<screen_name>/')
def challenge2(screen_name):
    try:
        title = 'At the airport check-in one of the employees recognizes you. He looks at you disapprovingly. You notice a pin on his chest. where it says \'END TO PLANET EARTH\' He probably recognizes you from the news... because of the mission you\'ve been on it a lot lately. What should you do about it?'
        question = 'You can either try to bribe him or Ignore the situation as if nothing had happened.'
        bribeText = 'The bribes was useful and helps you keep a low profile. But now your wallet is a little bit lighter. You lose 10$'
        ignoreAnswerText = 'You tried to ignore the situation completely.The employee lets their anti-earth friends know about your location. Aliens are 1 step closer...'
    except ValueError:
        status_code = 400
        cuba_airport = {
            "status_code": status_code,
            "message": "Invalid input"
        }

# run or hide
@app.route('/challenge3/<screen_name>/')
def challenge3(screen_name):
    try:
        title = 'Your previous flight landed late due to weather conditions and there\'s only 15 minutes before your next flight leaves. You are rushing to the next departure gate when you suddenly see alien raid in front of you! There is very little you can do about in this situation, you can either try to run past the raid like a madman or you can hide in the nearby trash can.'
        question = 'So are you going to run or hide?'
        runText = 'Oh no! The aliens spotted you and now know exactly where you are. You lose 2 distance steps.'
        hideText = 'Hurry up, jump in the trash can now! Try to make yourself comfortableand wait for the raid to end. After that you can catch the next flight. You lose 1 distance step.'
    except ValueError:
        status_code = 400
        cuba_airport = {
            "status_code": status_code,
            "message": "Invalid input"
        }

#flight cancelled
@app.route('/challenge4/<screen_name>/')
def challenge4(screen_name):
    try:
        title = 'You notice at the airport that your next flight has been cancelled! The ticket seller at the airport tells you that you have two options to choose from! Either you wait for a replacement flight which leaves tomorrow, or you can purchase new ticket for another airline\'s flight which leaves in two hours.'
        question = 'How about it? Do you wait or purchase a new ticket?'
        waitText = 'You spend the night sleeping uncomfortably on the airport floor. You lose 1 distance step.'
        newText = 'You got your new ticket. But because you decided to bought a new ticket from another airline, the previous company refuses to refund the old ticket. You lose 10$.'
    except ValueError:
        status_code = 400
        cuba_airport = {
            "status_code": status_code,
            "message": "Invalid input"
        }

#guess capital
@app.route('/challenge5/<screen_name>/')
def challenge5(screen_name):
    try:
        title = 'Suddenly a child runs in front of you crying and asks for help. She tells you that she has lost her family and can\'t find them anywhere. You don\'t have the heart to refuse and you decide to help her. You notice an announcement device near by and it would make it easier to find the child\'s family. But to use the device you must answer following question correctly.'

        country_list = [
            "Russia", "Canada", "China", "United States", "Brazil", "Australia", "India", "Argentina",
            "Denmark", "Algeria", "Finland", "Greenland", "Sweden", "Vietnam", "Switzerland", "Nepal",
            "Italy", "Indonesia", "Belgium", "Bolivia", "Iran", "Mongolia", "Peru", "Spain", "Kazakhstan",
            "Germany", "United Kingdom", "Colombia", "Ethiopia", "Thailand", "Poland",
            "Japan", "Norway", "Egypt", "Greece", "Pakistan", "Chile", "South Korea", "Turkey", "New Zealand",
            "Zambia", "Canada", "Afghanistan", "Iceland", "France", "Somalia", "North Korea", "Ukraine",
            "Botswana", "Madagascar", "Cuba"
        ]
        country_name = random.choice(country_list)
        capital = CountryInfo(country_name).capital()
        question = f'What is the capital of {country_name}?'

        rightAnswerText = 'Yes, that\'s right! Child\'s family is rather quickly found through the announcement. They are grateful to you and recognize you as a resistance member. The family wants to help you and they warn you that aliens are lurking at your next destination. Thanks to the tip, you can now take another route and avoid the encounter with the aliens. You get 1 distance step.'
        wrongAnswerText = 'Wrong, your geography seems to be rusty! And because of that you can\'t make the announcement and it takes very long time to find the child\'s family. Because it took so long, you missed your next flight. Aliens are 1 distance step closer.'
    except ValueError:
        status_code = 400
        cuba_airport = {
            "status_code": status_code,
            "message": "Invalid input"
        }

@app.route('/challenge6/<screen_name>/')
def challenge6(screen_name):
    try:
        title = 'You bump into another resistance member. He is skeptical if you are truly part of the resistance and wants to make sure before helping you further. By answering his question correctly, he promise to help you distract the aliens. Hurry up! The question is:'
        question = 'What is the name of the lead scientist of the resistance?'
        answer = 'Dr Alex Zen'
        right_answer = 'That is correct! You have proved that you\'re true resistance member and your new friend will help you forward. You gain 1 distance step.'
        wrong_answer = 'That\'s not it! I guess you didn\'t read the lore properly… Well, no help for you this time. Carry on.'
    except ValueError:
        status_code = 400
        cuba_airport = {
            "status_code": status_code,
            "message": "Invalid input"
        }

if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import psycopg2
import os
# import psycopg2.extras as extras
import requests
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
# to access environmental variables
from dotenv import load_dotenv
from flask_migrate import Migrate

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate= Migrate(app, db)

from models import Images

@app.route('/')
def welcome():
    images = Images.query.all()
    return jsonify([image.to_dict() for image in images])

@app.route('/populate')
def populate():
   response = requests.get('https://api.unsplash.com/photos/?client_id=ib1ASB7wMZjI17iwEYu1gb2Udzg4bWhlAEG9a4rlLGw&page=2&per_page=10&order_by=latest')
   data = response.json()

   for item in data:
       image_url = item["urls"]["regular"]
       image_desc = item["alt_description"]
       new_image = Images(image_url=image_url, image_desc=image_desc)
       db.session.add(new_image)

   db.session.commit()

   return 'Database populated successfully'

@app.route('/<name>')
def hello_name(name):
    return "Hello {}!".format(name)


if __name__ == '__main__':
    app.run()

from flask import Flask, jsonify, request, redirect, render_template
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

@app.route('/add_image')
def add_image():
    # new_image = request.form.get('new_image')
    response = requests.get("https://api.unsplash.com/photos/random?client_id=ib1ASB7wMZjI17iwEYu1gb2Udzg4bWhlAEG9a4rlLGw")
    data = response.json()
    print(data)
    new_image_url = data["urls"]["regular"]
    new_image_desc = data["alt_description"]

    new_Image = Images(image_url= new_image_url, image_desc=new_image_desc)
    db.session.add(new_Image)
    db.session.commit()

    return redirect('/')

@app.route('/search_image')
def search_image():
    # search_term = request.form.get('search_term')
    search_term = "sword"
    images = Images.query.filter(
            Images.image_desc.ilike('%' + search_term + '%')
        ).all()
    return jsonify([image.to_dict() for image in images])

@app.route('/delete_image/<user_id>')
def delete_image(user_id):
    Images.query.filter(Images.user_id == user_id).delete()
    db.session.commit()

    return redirect('/')


# @app.route('/<name>')
# def hello_name(name):
#     return "Hello {}!".format(name)


if __name__ == '__main__':
    app.run()
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
from flask_cors import CORS, cross_origin

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate= Migrate(app, db)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 
                         'Content-Type')
    # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173/')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    return response

from models import Images

@app.route('/')
def welcome():
    images = Images.query.all()
    return jsonify([image.to_dict() for image in images])

@app.route('/populate', methods=['GET'])
@cross_origin()
def populate():
    response = requests.get('https://api.unsplash.com/photos/?client_id=ib1ASB7wMZjI17iwEYu1gb2Udzg4bWhlAEG9a4rlLGw&page=2&per_page=10&order_by=latest')
    data = response.json()

    for item in data:
        image_url = item["urls"]["regular"]
        image_desc = item["alt_description"]
        new_image = Images(image_url=image_url, image_desc=image_desc)
        db.session.add(new_image)

    db.session.commit()

    images = Images.query.all()
    return jsonify([image.to_dict() for image in images])

@app.route('/add_image', methods=['POST'])
def add_image():
    # new_image = request.form.get('new_image')
    response = requests.get("https://api.unsplash.com/photos/random?client_id=ib1ASB7wMZjI17iwEYu1gb2Udzg4bWhlAEG9a4rlLGw")
    data = response.json()
    new_image_url = data["urls"]["regular"]
    new_image_desc = data["alt_description"]

    new_Image = Images(image_url= new_image_url, image_desc=new_image_desc)
    db.session.add(new_Image)
    db.session.commit()

    return redirect('/')

@app.route('/search_image', methods=['POST'])
def search_image():
    # search_term = request.form.get('search_term')
    search_term = "sword"
    images = Images.query.filter(
            Images.image_desc.ilike('%' + search_term + '%')
        ).all()
    return jsonify([image.to_dict() for image in images])

@app.route('/delete_image/<int:user_id>/', methods=['POST', 'DELETE', 'OPTIONS'])
@cross_origin()
def delete_image(user_id):
    print('love you')
    data = request.get_json()
    print('got here')
    image_input = data
    print('we were here')
    image = Images.query.filter(Images.user_id == user_id).first()
    if image.image_desc == image_input:
        db.session.delete(image)
        db.session.commit()

    images = Images.query.all()
    return jsonify([image.to_dict() for image in images])
    # return ''


# @app.route('/<name>')
# def hello_name(name):
#     return "Hello {}!".format(name)


if __name__ == '__main__':
    app.run()

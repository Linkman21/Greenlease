from flask import Flask, jsonify, request
from flask_cors import CORS
from handlers.users import *
from handlers.properties import *

# Activate
app = Flask(__name__)

# Apply CORS to this app
CORS(app)


@app.route('/')
def greeting():
    return 'Hello! This is the Greenlease App!'

# ============= Users ======================


@app.route('/greenlease/users', methods=["GET"])
def getAllUsers():
    return UsersHandler().getAllUsers()


@app.route('/greenlease/users/', methods=["GET", "POST"])
def getUser():
    email = request.args.get('email')
    password = request.args.get('password')
    first_name = request.args.get('first_name')
    last_name = request.args.get('last_name')
    phone = request.args.get('phone')
    if request.method == "GET":
        return UsersHandler().getUser(email, password)
    elif request.method == "POST":
        return UsersHandler().addUser(email, password, first_name, last_name, phone)
    else:
        return jsonify("Not Supported"), 405

# ============= Properties ======================


@app.route('/greenlease/properties', methods=["GET"])
def getAllProperties():
    return PropertiesHandler().getAllProperties()


@app.route('/greenlease/properties/', methods=["GET", "POST"])
def getProperty():
    landlord_id = request.args.get('landlord_id')
    address = request.args.get('address')
    bedrooms = request.args.get('bedrooms')
    bathrooms = request.args.get('bathrooms')
    pictures = request.args.get('pictures')
    if request.method == "GET":
        return PropertiesHandler().getProperty(landlord_id)
    elif request.method == "POST":
        return PropertiesHandler().addProperty(landlord_id, address, bedrooms, bathrooms, pictures)
    else:
        return jsonify("Not Supported"), 405

# ============= Run app ======================


if __name__ == '__main__':
    app.run(debug=1)

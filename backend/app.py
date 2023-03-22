from flask import Flask, jsonify, request
from flask_cors import CORS
from handlers.users import *
from handlers.properties import *
from flask.helpers import send_from_directory

# Activate
app = Flask(__name__, static_folder="../frontend/dist", static_url_path="")

# Apply CORS to this app
CORS(app)


@app.route('/')
def index():
    return send_from_directory(app.static_folder, "index.html")

# ============= Users ======================


@app.route('/api/users', methods=["GET"])
def getAllUsers():
    return UsersHandler().getAllUsers()


@app.route('/api/users/', methods=["GET", "POST"])
def getUser():
    email = request.args.get('email')
    password = request.args.get('password')
    first_name = request.args.get('first_name')
    last_name = request.args.get('last_name')
    phone = request.args.get('phone')
    type = request.args.get('type')
    if request.method == "GET":
        return UsersHandler().getUser(email, password, type)
    elif request.method == "POST":
        return UsersHandler().addUser(email, password, first_name, last_name, phone, type)
    else:
        return jsonify("Not Supported"), 405

# ============= Properties ======================


@app.route('/api/properties', methods=["GET"])
def getAllProperties():
    return PropertiesHandler().getAllProperties()


@app.route('/api/properties/', methods=["GET", "POST"])
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

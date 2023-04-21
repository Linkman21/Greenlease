from flask import Flask, jsonify, request
from flask_cors import CORS
from handlers.users import *
from handlers.properties import *
from handlers.listings import *
from flask.helpers import send_from_directory

# Activate
app = Flask(__name__, static_folder="../frontend/dist", static_url_path="")

# Apply CORS to this app
CORS(app)


# Serve app
@app.route('/')
def index():
    return send_from_directory(app.static_folder, "index.html")


# Handle missing pages
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, "index.html")


# ============= Users ======================
@app.route('/api/users/', methods=["GET", "POST"])
def users_endpoint():
    email = request.args.get('email')
    password = request.args.get('password')
    first_name = request.args.get('first_name')
    last_name = request.args.get('last_name')
    phone = request.args.get('phone')
    user_type = request.args.get('type')
    if request.method == "GET":
        return UsersHandler().getUser(email, password, user_type)
    elif request.method == "POST":
        return UsersHandler().addUser(email, password, first_name, last_name, phone, user_type)
    else:
        return jsonify("Not Supported"), 405


# ============= Properties ======================
@app.route('/api/properties', methods=["GET"])
def all_properties_endpoint():
    if request.method == "GET":
        return PropertiesHandler().getAllProperties()
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/properties/', methods=["GET", "POST"])
def properties_endpoint():
    landlord_id = request.args.get('landlord_id')
    name = request.args.get('name')
    address = request.args.get('address')
    bedrooms = request.args.get('bedrooms')
    bathrooms = request.args.get('bathrooms')
    pictures = request.args.get('pictures')
    if request.method == "GET":
        return PropertiesHandler().getProperties(landlord_id)
    elif request.method == "POST":
        return PropertiesHandler().addProperty(landlord_id, name, address, bedrooms, bathrooms, pictures)
    else:
        return jsonify("Not Supported"), 405


# ============= Listings ======================
@app.route('/api/listings', methods=["GET"])
def all_listings_endpoint():
    if request.method == "GET":
        return ListingsHandler().getAllListings()
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/listings/', methods=["GET", "POST"])
def listings_endpoint():
    landlord_id = request.args.get('landlord_id')
    property_id = request.args.get('property_id')
    title = request.args.get('title')
    description = request.args.get('description')
    pet_flag = request.args.get('pet_flag')
    price = request.args.get('price')
    if request.method == "GET":
        return ListingsHandler().getListings(landlord_id)
    elif request.method == "POST":
        return ListingsHandler().addListing(landlord_id, property_id, title, description, pet_flag, price)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/listings/filters/', methods=["GET"])
def listings_filters_endpoint():
    search = request.args.get('search')
    bedrooms = request.args.get('bedrooms')
    bathrooms = request.args.get('bathrooms')
    pets = request.args.get('pets')
    if request.method == "GET":
        return ListingsHandler().getFilteredListings(search, bedrooms, bathrooms, pets)
    else:
        return jsonify("Not Supported"), 405


# ============= Run app ======================
if __name__ == '__main__':
    app.run(debug=1)

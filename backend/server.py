from flask import Flask, jsonify, request, json
from flask_cors import CORS
from handlers.users import *
from handlers.properties import *
from handlers.listings import *
from flask.helpers import send_from_directory
from handlers.ratings import *
from handlers.contracts import *
from handlers.invoices import *

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


@app.route('/api/properties/', methods=["GET", "POST", "DELETE"])
def properties_endpoint():
    landlord_id = request.args.get('landlord_id')
    property_id = request.args.get('property_id')
    bedrooms = request.args.get('bedrooms')
    bathrooms = request.args.get('bathrooms')
    content_type = request.headers.get('Content-Type')
    name = ""
    address = ""
    pictures = []
    if (content_type == 'application/json'):
        data = request.get_json()
        print(data)
        name = data['name']
        address = data['address']
        pictures = data['images']
    if request.method == "GET":
        return PropertiesHandler().getProperties(landlord_id)
    elif request.method == "POST":
        return PropertiesHandler().addProperty(landlord_id, name, address, bedrooms, bathrooms, pictures)
    elif request.method == "DELETE":
        return PropertiesHandler().deleteProperty(property_id)
    else:
        return jsonify("Not Supported"), 405


# ============= Listings ======================
@app.route('/api/listings', methods=["GET"])
def all_listings_endpoint():
    if request.method == "GET":
        return ListingsHandler().getAllListings()
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/listings/', methods=["GET", "POST", "DELETE"])
def listings_endpoint():
    landlord_id = request.args.get('landlord_id')
    property_id = request.args.get('property_id')
    pet_flag = request.args.get('pet_flag')
    price = request.args.get('price')
    listing_id = request.args.get('listing_id')
    title = ""
    description = ""
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        data = request.get_json()
        print(data)
        title = data['title']
        description = data['description']
    if request.method == "GET":
        return ListingsHandler().getListings(landlord_id)
    elif request.method == "POST":
        return ListingsHandler().addListing(landlord_id, property_id, title, description, pet_flag, price)
    elif request.method == "DELETE":
        return ListingsHandler().deleteListing(listing_id)
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


# ============= Ratings ======================
@app.route('/api/ratings/landlord/', methods=["GET", "POST"])
def landlord_ratings_endpoint():
    landlord_id = request.args.get('landlord_id')
    tenant_id = request.args.get('tenant_id')
    rating = request.args.get('rating')
    if request.method == "GET":
        return RatingsHandler().getLandlordRating(landlord_id)
    elif request.method == "POST":
        return RatingsHandler().postLandlordRating(landlord_id, tenant_id, rating)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/ratings/tenant/', methods=["GET", "POST"])
def tenant_ratings_endpoint():
    tenant_id = request.args.get('tenant_id')
    landlord_id = request.args.get('landlord_id')
    rating = request.args.get('rating')
    if request.method == "GET":
        return RatingsHandler().getTenantRating(tenant_id)
    elif request.method == "POST":
        return RatingsHandler().postTenantRating(tenant_id, landlord_id, rating)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/ratings/property/', methods=["GET", "POST"])
def property_ratings_endpoint():
    property_id = request.args.get('property_id')
    tenant_id = request.args.get('tenant_id')
    rating = request.args.get('rating')
    if request.method == "GET":
        return RatingsHandler().getPropertyRating(property_id)
    elif request.method == "POST":
        return RatingsHandler().postPropertyRating(tenant_id, property_id, rating)
    else:
        return jsonify("Not Supported"), 405


# ============= Contracts ======================
@app.route('/api/contracts/request/', methods=["POST"])
def request_contract_endpoint():
    tenant_id = request.args.get('tenant_id')
    landlord_id = request.args.get('landlord_id')
    property_id = request.args.get('property_id')
    if request.method == "POST":
        return ContractsHandler().postContract(landlord_id, tenant_id, property_id)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/contracts/active/', methods=["GET"])
def active_contracts_endpoint():
    landlord_id = request.args.get('landlord_id')
    if request.method == "GET":
        return ContractsHandler().getActiveContracts(landlord_id)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/contracts/pending/', methods=["GET"])
def pending_contracts_endpoint():
    landlord_id = request.args.get('landlord_id')
    if request.method == "GET":
        return ContractsHandler().getPendingContracts(landlord_id)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/contracts/current/', methods=["GET"])
def current_contract_endpoint():
    tenant_id = request.args.get('tenant_id')
    if request.method == "GET":
        return ContractsHandler().getCurrentContract(tenant_id)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/contracts/sign/', methods=["PUT"])
def sign_contracts_endpoint():
    contract_id = request.args.get('contract_id')
    date_end = request.args.get('date_end')
    date_start = request.args.get('date_start')
    price = request.args.get('price')
    pdf = request.get_json()
    if request.method == "PUT":
        return ContractsHandler().putContract(contract_id, date_start, date_end, pdf, price)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/contracts/delete/', methods=["DELETE"])
def delete_contract_endpoint():
    contract_id = request.args.get('contract_id')
    if request.method == "DELETE":
        return ContractsHandler().deleteContract(contract_id)
    else:
        return jsonify("Not Supported"), 405


# ============= Invoices ======================
@app.route('/api/invoices/post/', methods=["POST"])
def post_invoice_endpoint():
    contract_id = request.args.get('contract_id')
    date_due = request.args.get('date_due')
    late_fee = request.args.get('late_fee')
    if request.method == "POST":
        return InvoicesHandler().postInvoice(contract_id, date_due, late_fee)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/invoices/paid/landlord/', methods=["GET"])
def invoices_paid_landlord_endpoint():
    landlord_id = request.args.get('landlord_id')
    if request.method == "GET":
        return InvoicesHandler().getInvoicesPaidLandlord(landlord_id)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/invoices/pending/landlord/', methods=["GET"])
def invoices_pending_landlord_endpoint():
    landlord_id = request.args.get('landlord_id')
    if request.method == "GET":
        return InvoicesHandler().getInvoicesPendingLandlord(landlord_id)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/invoices/total/landlord/', methods=["GET"])
def invoices_total_landlord_endpoint():
    landlord_id = request.args.get('landlord_id')
    if request.method == "GET":
        return InvoicesHandler().getInvoicesTotalLandlord(landlord_id)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/invoices/paid/tenant/', methods=["GET"])
def invoices_paid_tenant_endpoint():
    tenant_id = request.args.get('tenant_id')
    if request.method == "GET":
        return InvoicesHandler().getInvoicesPaidTenant(tenant_id)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/invoices/pending/tenant/', methods=["GET"])
def invoices_pending_tenant_endpoint():
    tenant_id = request.args.get('tenant_id')
    if request.method == "GET":
        return InvoicesHandler().getInvoicesPendingTenant(tenant_id)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/invoices/total/tenant/', methods=["GET"])
def invoices_total_tenant_endpoint():
    tenant_id = request.args.get('tenant_id')
    if request.method == "GET":
        return InvoicesHandler().getInvoicesTotalTenant(tenant_id)
    else:
        return jsonify("Not Supported"), 405


@app.route('/api/invoices/pay/', methods=["PUT"])
def invoices_pay_endpoint():
    invoice_id = request.args.get('invoice_id')
    total_paid = request.args.get('total_paid')
    if request.method == "PUT":
        return InvoicesHandler().payInvoice(invoice_id, total_paid)
    else:
        return jsonify("Not Supported"), 405


# ============= Run app ======================
if __name__ == '__main__':
    app.run(debug=1)

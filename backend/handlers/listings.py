from flask import jsonify
from dao.listings import ListingsDAO


class ListingsHandler:
    # Build listings object
    def build_listings_dict(self, row):
        result = {}
        result['listing_id'] = row[0]
        result['landlord_id'] = row[1]
        result['property_id'] = row[2]
        result['name'] = row[3]
        result['address'] = row[4]
        result['bedrooms'] = row[5]
        result['bathrooms'] = row[6]
        result['pictures'] = row[7]
        result['title'] = row[8]
        result['description'] = row[9]
        result['pet_flag'] = row[10]
        result['date_listed'] = row[11]
        result['price'] = row[12]
        return result

    # GET
    def getAllListings(self):
        dao = ListingsDAO()
        listings_list = dao.getAllListings()
        result = []
        for row in listings_list:
            dict = self.build_listings_dict(row)
            result.append(dict)
        return jsonify(result)

    def getListings(self, landlord_id):
        dao = ListingsDAO()

        if not landlord_id:
            return jsonify("Missing Arguments"), 404

        listings_list = dao.getListings(landlord_id)
        result = []
        for row in listings_list:
            dict = self.build_listings_dict(row)
            result.append(dict)
        return jsonify(result)

    # POST

    def addListing(self, landlord_id, property_id, title, description, pet_flag, price):
        if landlord_id and property_id and title and description and pet_flag and price:
            dao = ListingsDAO()
            listings_list = dao.addListing(
                landlord_id, property_id, title, description, pet_flag, price)
            result = []
            for row in listings_list:
                dict = self.build_listings_dict(row)
                result.append(dict)
            return jsonify(result)
        return jsonify("Missing Arguments"), 404

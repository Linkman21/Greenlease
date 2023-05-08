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
        result['landlord_first_name'] = row[13]
        result['landlord_last_name'] = row[14]
        result['landlord_phone'] = row[15]
        result['property_rating'] = row[16]
        result['landlord_rating'] = row[17]
        return result

    # =================== GET ===================
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

    def getFilteredListings(self, search, bedrooms, bathrooms, pets):
        dao = ListingsDAO()
        if not search and not bedrooms and not bathrooms and not pets:
            return self.getAllListings()
        listings_list = dao.getFilteredListings(
            search, bedrooms, bathrooms, pets)
        result = []
        for row in listings_list:
            dict = self.build_listings_dict(row)
            result.append(dict)
        return jsonify(result)

    # =================== POST ===================
    def addListing(self, landlord_id, property_id, title, description, pet_flag, price):
        if not landlord_id and not property_id and not title and not description and not pet_flag and not price:
            return jsonify("Missing Arguments"), 404
        dao = ListingsDAO()
        result = dao.addListing(
            landlord_id, property_id, title, description, pet_flag, price)
        return jsonify(result)

    # =================== DELETE ===================
    def deleteListing(self, listing_id):
        if not listing_id:
            return jsonify("Missing Arguments"), 404
        dao = ListingsDAO()
        result = dao.deleteListing(listing_id)
        return jsonify(result)

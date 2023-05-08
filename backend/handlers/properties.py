from flask import jsonify
from dao.properties import PropertiesDAO


class PropertiesHandler:
    # Build property object
    def build_property_dict(self, row):
        result = {}
        result['property_id'] = row[0]
        result['landlord_id'] = row[1]
        result['name'] = row[2]
        result['address'] = row[3]
        result['bedrooms'] = row[4]
        result['bathrooms'] = row[5]
        result['pictures'] = row[6]
        result['rating'] = row[7]
        return result

    # GET
    def getAllProperties(self):
        dao = PropertiesDAO()
        properties_list = dao.getAllProperties()
        result = []
        for row in properties_list:
            dict = self.build_property_dict(row)
            result.append(dict)
        return jsonify(result)

    def getProperties(self, landlord_id):
        dao = PropertiesDAO()
        if landlord_id:
            properties_list = dao.getProperties(landlord_id)
            result = []
            for row in properties_list:
                dict = self.build_property_dict(row)
                result.append(dict)
            return jsonify(result)
        return jsonify("Missing Arguments"), 404

    # POST
    def addProperty(self, landlord_id, name, address, bedrooms, bathrooms, pictures):
        if not landlord_id and not name and not address and not bedrooms and not bathrooms and not pictures:
            return jsonify("Missing Arguments"), 404
        dao = PropertiesDAO()
        result = dao.addProperty(
            landlord_id, name, address, bedrooms, bathrooms, pictures)
        return jsonify(result), 201

    # DELETE
    def deleteProperty(self, property_id):
        if not property_id:
            return jsonify("Missing Arguments"), 404
        dao = PropertiesDAO()
        result = dao.deleteProperty(property_id)
        return jsonify(result)

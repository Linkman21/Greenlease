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
        if landlord_id and name and address and bedrooms and bathrooms and pictures:
            dao = PropertiesDAO()
            property_id = dao.addProperty(
                landlord_id, name, address, bedrooms, bathrooms, pictures)
            result = self.build_property_dict(
                [property_id, landlord_id, name, address, bedrooms, bathrooms, pictures])
            return jsonify(Property=result), 201
        return jsonify("Missing Arguments"), 404

    # DELETE
    def deleteProperty(self, property_id):
        dao = PropertiesDAO()
        if not property_id:
            return jsonify("Missing Arguments"), 404

        result = dao.deleteProperty(property_id)
        return jsonify(result)

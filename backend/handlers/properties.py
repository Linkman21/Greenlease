from flask import jsonify
from dao.properties import PropertiesDAO


class PropertiesHandler:
    # Build property object
    def build_property_dict(self, row):
        result = {}
        result['property_id'] = row[0]
        result['landlord_id'] = row[1]
        result['address'] = row[2]
        result['bedrooms'] = row[3]
        result['bathrooms'] = row[4]
        result['pictures'] = row[5]
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

    def getProperty(self, landlord_id):
        dao = PropertiesDAO()
        if landlord_id:
            result = dao.getProperty(landlord_id)
            if not result:
                return jsonify("Not Found"), 404
            else:
                dict = self.build_property_dict(result)
                return jsonify(dict), 200
        return jsonify("Missing Arguments"), 404

    # POST
    def addProperty(self, landlord_id, address, bedrooms, bathrooms, pictures):
        if landlord_id and address and bedrooms and bathrooms and pictures:
            dao = PropertiesDAO()
            property_id = dao.addProperty(
                landlord_id, address, bedrooms, bathrooms, pictures)
            result = self.build_property_dict(
                [property_id, landlord_id, address, bedrooms, bathrooms, pictures])
            return jsonify(Property=result), 201
        return jsonify("Missing Arguments"), 404

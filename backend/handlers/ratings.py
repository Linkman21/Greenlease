from flask import jsonify
from dao.ratings import RatingsDAO


class RatingsHandler:
    # LANDLORD
    def getLandlordRating(self, landlord_id):
        dao = RatingsDAO()
        if not landlord_id:
            return jsonify("Missing Arguments"), 404
        result = dao.getLandlordRating(landlord_id)
        return jsonify(result), 200

    def postLandlordRating(self, landlord_id, tenant_id, rating):
        if not landlord_id and not tenant_id and not rating:
            return jsonify("Missing Arguments"), 404
        dao = RatingsDAO()
        result = dao.postLandlordRating(landlord_id, tenant_id, rating)
        return jsonify(result), 201

    # TENANT
    def getTenantRating(self, tenant_id):
        dao = RatingsDAO()
        if not tenant_id:
            return jsonify("Missing Arguments"), 404
        result = dao.getTenantRating(tenant_id)
        return jsonify(result)

    def postTenantRating(self, tenant_id, landlord_id, rating):
        if not tenant_id and not landlord_id and not rating:
            return jsonify("Missing Arguments"), 404
        dao = RatingsDAO()
        result = dao.postTenantRating(tenant_id, landlord_id, rating)
        return jsonify(result), 201

    # PROPERTY
    def getPropertyRating(self, property_id):
        dao = RatingsDAO()
        if not property_id:
            return jsonify("Missing Arguments"), 404
        result = dao.getPropertyRating(property_id)
        return jsonify(result)

    def postPropertyRating(self, tenant_id, property_id, rating):
        if not tenant_id and not property_id and not rating:
            return jsonify("Missing Arguments"), 404
        dao = RatingsDAO()
        result = dao.postPropertyRating(tenant_id, property_id, rating)
        return jsonify(result), 201

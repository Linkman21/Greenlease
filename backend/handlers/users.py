from flask import jsonify
from dao.users import UsersDAO


class UsersHandler:
    # Build user object
    def build_user_dict(self, row, type):
        result = {}
        result['user_id'] = row[0]
        result['email'] = row[1]
        result['password'] = row[2]
        result['first_name'] = row[3]
        result['last_name'] = row[4]
        result['phone'] = row[5]
        result[type+"_id"] = row[6]
        result["type"] = type
        return result

    # GET
    def getUser(self, email, password, type):
        dao = UsersDAO()
        if email and password:
            result = dao.getUser(email, password, type)
            if not result:
                return jsonify("Not Found"), 404
            else:
                dict = self.build_user_dict(result, type)
                return jsonify(dict), 200
        return jsonify("Missing Arguments"), 404

    # POST
    def addUser(self, email, password, first_name, last_name, phone, type):
        if email and password and first_name and last_name and phone and type:
            dao = UsersDAO()
            result = dao.addUser(
                email, password, first_name, last_name, phone, type)
            dict = self.build_user_dict(result, type)
            return jsonify(dict), 201
        return jsonify("Missing Arguments"), 404

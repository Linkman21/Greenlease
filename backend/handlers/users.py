from flask import jsonify
from dao.users import UsersDAO


class UsersHandler:
    # Build user object
    def build_user_dict(self, row):
        result = {}
        result['user_id'] = row[0]
        result['email'] = row[1]
        result['password'] = row[2]
        result['first_name'] = row[3]
        result['last_name'] = row[4]
        result['phone'] = row[5]
        return result

    # GET
    def getAllUsers(self):
        dao = UsersDAO()
        users_list = dao.getAllUsers()
        result = []
        for row in users_list:
            dict = self.build_user_dict(row)
            result.append(dict)
        return jsonify(result)

    def getUser(self, email, password):
        dao = UsersDAO()
        if email and password:
            result = dao.getUser(email, password)
            if not result:
                return jsonify("Not Found"), 404
            else:
                dict = self.build_user_dict(result)
                return jsonify(dict), 200
        return jsonify("Missing Arguments"), 404

    # POST
    def addUser(self, email, password, first_name, last_name, phone):
        if email and password and first_name and last_name and phone:
            dao = UsersDAO()
            user_id = dao.addUser(
                email, password, first_name, last_name, phone)
            result = self.build_user_dict(
                [user_id, email, password, first_name, last_name, phone])
            return jsonify(User=result), 201
        return jsonify("Missing Arguments"), 404

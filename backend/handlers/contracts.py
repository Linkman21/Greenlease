from flask import jsonify
from dao.contracts import ContractsDAO


class ContractsHandler:
    # Build contract object
    def build_contract_dict(self, row):
        result = {}
        result['contract_id'] = row[0]
        result['landlord_id'] = row[1]
        result['tenant_id'] = row[2]
        result['property_id'] = row[3]
        result['date_start'] = row[4]
        result['date_end'] = row[5]
        result['pdf'] = row[6]
        result['name'] = row[7]
        result['landlord_first_name'] = row[8]
        result['landlord_last_name'] = row[9]
        result['landlord_phone'] = row[10]
        result['tenant_first_name'] = row[11]
        result['tenant_last_name'] = row[12]
        result['tenant_phone'] = row[13]
        result['price'] = row[14]
        return result

    def postContract(self, landlord_id, tenant_id, property_id):
        if not landlord_id and not tenant_id and not property_id:
            return jsonify("Missing Arguments"), 404
        dao = ContractsDAO()
        result = dao.postContract(landlord_id, tenant_id, property_id)
        return jsonify(result), 201

    def getActiveContracts(self, landlord_id):
        if not landlord_id:
            return jsonify("Missing Arguments"), 404
        dao = ContractsDAO()
        contracts_list = dao.getActiveContracts(landlord_id)
        result = []
        for row in contracts_list:
            dict = self.build_contract_dict(row)
            result.append(dict)
        return jsonify(result)

    def getPendingContracts(self, landlord_id):
        if not landlord_id:
            return jsonify("Missing Arguments"), 404
        dao = ContractsDAO()
        contracts_list = dao.getPendingContracts(landlord_id)
        result = []
        for row in contracts_list:
            dict = self.build_contract_dict(row)
            result.append(dict)
        return jsonify(result)

    def getCurrentContract(self, tenant_id):
        if not tenant_id:
            return jsonify("Missing Arguments"), 404

        dao = ContractsDAO()
        contracts_list = dao.getCurrentContract(tenant_id)
        result = []
        for row in contracts_list:
            dict = self.build_contract_dict(row)
            result.append(dict)
        return jsonify(result)

    def putContract(self, contract_id, date_start, date_end, pdf, price):
        if not contract_id and not date_end and not date_start and not pdf and not price:
            return jsonify("Missing Arguments"), 404
        dao = ContractsDAO()
        result = dao.putContract(contract_id, date_start, date_end, pdf, price)
        return jsonify(result), 201

    def deleteContract(self, contract_id):
        if not contract_id:
            return jsonify("Missing Arguments"), 404
        dao = ContractsDAO()
        result = dao.deleteContract(contract_id)
        return jsonify(result), 201

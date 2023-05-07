from flask import jsonify
from dao.invoices import InvoicesDAO


class InvoicesHandler:
    # Build invoice object
    def build_invoice_dict(self, row):
        result = {}
        result['invoice_id'] = row[0]
        result['landlord_id'] = row[1]
        result['tenant_id'] = row[2]
        result['date_received'] = row[3]
        result['date_paid'] = row[4]
        result['date_due'] = row[5]
        result['late_fee'] = row[6]
        result['total'] = row[7]
        result['contract_name'] = row[8]
        return result

    def postInvoice(self, landlord_id, tenant_id, date_due, late_fee, total):
        if not landlord_id and not tenant_id and not date_due and not late_fee and not total:
            return jsonify("Missing Arguments"), 404
        dao = InvoicesDAO()
        result = dao.postInvoice(
            landlord_id, tenant_id, date_due, late_fee, total)
        return jsonify(result)

    def getInvoicesPaidLandlord(self, landlord_id):
        if not landlord_id:
            return jsonify("Missing Arguments"), 404

        dao = InvoicesDAO()
        invoices_list = dao.getInvoicesPaidLandlord(landlord_id)
        result = []
        for row in invoices_list:
            dict = self.build_invoice_dict(row)
            result.append(dict)
        return jsonify(result)

    def getInvoicesPendingLandlord(self, landlord_id):
        if not landlord_id:
            return jsonify("Missing Arguments"), 404

        dao = InvoicesDAO()
        invoices_list = dao.getInvoicesPendingLandlord(landlord_id)
        result = []
        for row in invoices_list:
            dict = self.build_invoice_dict(row)
            result.append(dict)
        return jsonify(result)

    def getInvoicesTotalLandlord(self, landlord_id):
        if not landlord_id:
            return jsonify("Missing Arguments"), 404
        dao = InvoicesDAO()
        result = dao.getInvoicesTotalLandlord(landlord_id)
        return jsonify(result)

    def getInvoicesPaidTenant(self, tenant_id):
        if not tenant_id:
            return jsonify("Missing Arguments"), 404

        dao = InvoicesDAO()
        invoices_list = dao.getInvoicesPaidTenant(tenant_id)
        result = []
        for row in invoices_list:
            dict = self.build_invoice_dict(row)
            result.append(dict)
        return jsonify(result)

    def getInvoicesPendingTenant(self, tenant_id):
        if not tenant_id:
            return jsonify("Missing Arguments"), 404

        dao = InvoicesDAO()
        invoices_list = dao.getInvoicesPendingTenant(tenant_id)
        result = []
        for row in invoices_list:
            dict = self.build_invoice_dict(row)
            result.append(dict)
        return jsonify(result)

    def getInvoicesTotalTenant(self, tenant_id):
        if not tenant_id:
            return jsonify("Missing Arguments"), 404
        dao = InvoicesDAO()
        result = dao.getInvoicesTotalTenant(tenant_id)
        return jsonify(result)

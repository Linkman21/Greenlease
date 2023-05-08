from flask import jsonify
from dao.invoices import InvoicesDAO


class InvoicesHandler:
    # Build invoice object
    def build_invoice_dict(self, row):
        result = {}
        result['invoice_id'] = row[0]
        result['contract_id'] = row[1]
        result['date_issued'] = row[2]
        result['date_due'] = row[3]
        result['date_paid'] = row[4]
        result['late_fee'] = row[5]
        result['total_paid'] = row[6]
        result['contract_name'] = row[7]
        result['contract_price'] = row[8]
        return result

    def postInvoice(self, contract_id, date_due, late_fee):
        if not contract_id and not date_due and not late_fee:
            return jsonify("Missing Arguments"), 404
        dao = InvoicesDAO()
        result = dao.postInvoice(contract_id, date_due, late_fee)
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

    def payInvoice(self, invoice_id, total_paid):
        if not invoice_id and not total_paid:
            return jsonify("Missing Arguments"), 404
        dao = InvoicesDAO()
        result = dao.payInvoice(invoice_id, total_paid)
        return jsonify(result)

from config.credentials import pg_config
import psycopg2


class InvoicesDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'],
                                                                            pg_config['user'],
                                                                            pg_config['password'],
                                                                            pg_config['port'],
                                                                            pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    def postInvoice(self, contract_id, date_due, late_fee):
        query = "insert into invoices(contract_id, date_due, late_fee) values(%s, %s, %s);"
        cursor = self.conn.cursor()
        cursor.execute(query, (contract_id, date_due, late_fee,))
        self.conn.commit()
        cursor.close()
        return "POST Success"

    def getInvoicesPaidLandlord(self, landlord_id):
        query = "select invoice_id, contract_id, date_issued, date_due, date_paid, late_fee, total_paid, name, price from invoices natural join contracts natural join properties where landlord_id=%s and total_paid is not null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        result = cursor.fetchall()
        cursor.close()
        return result

    def getInvoicesPendingLandlord(self, landlord_id):
        query = "select invoice_id, contract_id, date_issued, date_due, date_paid, late_fee, total_paid, name, price from invoices natural join contracts natural join properties where landlord_id=%s and total_paid is null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        result = cursor.fetchall()
        cursor.close()
        return result

    def getInvoicesTotalLandlord(self, landlord_id):
        query = "select sum(price) from invoices natural join contracts where landlord_id=%s and date_paid is not null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        result = cursor.fetchone()[0]
        cursor.close()
        return result

    def getInvoicesPaidTenant(self, tenant_id):
        query = "select invoice_id, contract_id, date_issued, date_due, date_paid, late_fee, total_paid, name, price from invoices natural join contracts natural join properties where tenant_id=%s and total_paid is not null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (tenant_id,))
        result = cursor.fetchall()
        cursor.close()
        return result

    def getInvoicesPendingTenant(self, tenant_id):
        query = "select invoice_id, contract_id, date_issued, date_due, date_paid, late_fee, total_paid, name, price from invoices natural join contracts natural join properties where tenant_id=%s and total_paid is null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (tenant_id,))
        result = cursor.fetchall()
        cursor.close()
        return result

    def getInvoicesTotalTenant(self, tenant_id):
        query = "select sum(price) from invoices natural join contracts where tenant_id=%s and date_paid is null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (tenant_id,))
        result = cursor.fetchone()[0]
        cursor.close()
        return result

    def payInvoice(self, invoice_id, total_paid):
        query = "update invoices set date_paid=now(), total_paid=%s where invoice_id=%s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (total_paid, invoice_id,))
        self.conn.commit()
        cursor.close()
        return "PUT Success"

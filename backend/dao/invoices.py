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

    def postInvoice(self, landlord_id, tenant_id, date_due, late_fee, total):
        query = "insert into invoices(landlord_id, tenant_id, date_due, late_fee, total) values(%s, %s, %s, %s, %s);"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id, tenant_id,
                       date_due, late_fee, total,))
        self.conn.commit()
        cursor.close()
        return "POST Success"

    def getInvoicesPaidLandlord(self, landlord_id):
        query = "select invoice_id, landlord_id, tenant_id, date_received, date_paid, date_due, late_fee, total, name from invoices natural join contracts natural join properties where landlord_id=%s and date_paid is not null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        result = cursor.fetchall()
        cursor.close()
        return result

    def getInvoicesPendingLandlord(self, landlord_id):
        query = "select invoice_id, landlord_id, tenant_id, date_received, date_paid, date_due, late_fee, total, name from invoices natural join contracts natural join properties where landlord_id=%s and date_paid is null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        result = cursor.fetchall()
        cursor.close()
        return result

    def getInvoicesTotalLandlord(self, landlord_id):
        query = "select sum(total) from invoices where landlord_id=%s and date_paid is not null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        result = cursor.fetchone()[0]
        cursor.close()
        return result

    def getInvoicesPaidTenant(self, tenant_id):
        query = "select invoice_id, landlord_id, tenant_id, date_received, date_paid, date_due, late_fee, total, name from invoices natural join contracts natural join properties where tenant_id=%s and date_paid is not null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (tenant_id,))
        result = cursor.fetchall()
        cursor.close()
        return result

    def getInvoicesPendingTenant(self, tenant_id):
        query = "select invoice_id, landlord_id, tenant_id, date_received, date_paid, date_due, late_fee, total, name from invoices natural join contracts natural join properties where tenant_id=%s and date_paid is null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (tenant_id,))
        result = cursor.fetchall()
        cursor.close()
        return result

    def getInvoicesTotalTenant(self, tenant_id):
        query = "select sum(total) from invoices where tenant_id=%s and date_paid is null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (tenant_id,))
        result = cursor.fetchone()[0]
        cursor.close()
        return result

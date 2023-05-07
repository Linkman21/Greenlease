from config.credentials import pg_config
import psycopg2


class ContractsDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'],
                                                                            pg_config['user'],
                                                                            pg_config['password'],
                                                                            pg_config['port'],
                                                                            pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    def postContract(self, landlord_id, tenant_id, property_id):
        query = "insert into contracts(landlord_id, tenant_id, property_id) values(%s, %s, %s) returning contract_id, landlord_id, tenant_id, property_id, date_start, date_end, pdf;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id, tenant_id, property_id,))
        result = cursor.fetchone()
        self.conn.commit()
        cursor.close()
        return result

    def getActiveContracts(self, landlord_id):
        query = "select contract_id, landlord_id, tenant_id, property_id, date_start, date_end, pdf, name, landlord_first_name, landlord_last_name, landlord_phone, tenant_first_name, tenant_last_name, tenant_phone from contracts natural join properties natural join (select landlord_id, first_name as landlord_first_name, last_name as landlord_last_name, phone as landlord_phone from landlords natural join users) as l natural join (select tenant_id, first_name as tenant_first_name, last_name as tenant_last_name, phone as tenant_phone from tenants natural join users) as t where landlord_id=%s and date_start is not null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        result = cursor.fetchall()
        cursor.close()
        return result

    def getPendingContracts(self, landlord_id):
        query = "select contract_id, landlord_id, tenant_id, property_id, date_start, date_end, pdf, name, landlord_first_name, landlord_last_name, landlord_phone, tenant_first_name, tenant_last_name, tenant_phone from contracts natural join properties natural join (select landlord_id, first_name as landlord_first_name, last_name as landlord_last_name, phone as landlord_phone from landlords natural join users) as l natural join (select tenant_id, first_name as tenant_first_name, last_name as tenant_last_name, phone as tenant_phone from tenants natural join users) as t where landlord_id=%s and date_start is null;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        result = cursor.fetchall()
        cursor.close()
        return result

    def getCurrentContract(self, tenant_id):
        query = "select contract_id, landlord_id, tenant_id, property_id, date_start, date_end, pdf, name, landlord_first_name, landlord_last_name, landlord_phone, tenant_first_name, tenant_last_name, tenant_phone from contracts natural join properties natural join (select landlord_id, first_name as landlord_first_name, last_name as landlord_last_name, phone as landlord_phone from landlords natural join users) as l natural join (select tenant_id, first_name as tenant_first_name, last_name as tenant_last_name, phone as tenant_phone from tenants natural join users) as t where tenant_id=%s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (tenant_id,))
        result = cursor.fetchall()
        cursor.close()
        return result

    def putContract(self, contract_id, date_start, date_end, pdf):
        query = "update contracts set date_start=%s, date_end=%s, pdf=%s where contract_id=%s returning contract_id, landlord_id, tenant_id, property_id, date_start, date_end, pdf; select contract_id, landlord_id, tenant_id, property_id, date_start, date_end, pdf, name, landlord_first_name, landlord_last_name, landlord_phone, tenant_first_name, tenant_last_name, tenant_phone from contracts natural join properties natural join (select landlord_id, first_name as landlord_first_name, last_name as landlord_last_name, phone as landlord_phone from landlords natural join users) as l natural join (select tenant_id, first_name as tenant_first_name, last_name as tenant_last_name, phone as tenant_phone from tenants natural join users) as t where contract_id=%s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (date_start, date_end,
                       pdf, contract_id, contract_id,))
        result = cursor.fetchone()
        self.conn.commit()
        cursor.close()
        return result

    def deleteContract(self, contract_id):
        query = "delete from contracts where contract_id=%s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (contract_id,))
        self.conn.commit()
        cursor.close()
        return "Delete Complete"

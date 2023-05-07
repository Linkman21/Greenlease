from config.credentials import pg_config
import psycopg2


class RatingsDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'],
                                                                            pg_config['user'],
                                                                            pg_config['password'],
                                                                            pg_config['port'],
                                                                            pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    # LANDLORD
    def getLandlordRating(self, landlord_id):
        query = "select avg(rating) from landlord_ratings where landlord_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        result = cursor.fetchone()[0]
        cursor.close()
        if not result:
            result = 0
        print(result)
        return result

    def postLandlordRating(self, landlord_id, tenant_id, rating):
        query = "insert into landlord_ratings(landlord_id, tenant_id, rating) values(%s, %s, %s);"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id, tenant_id, rating, ))
        self.conn.commit()
        cursor.close()
        return "POST Complete"

    # TENANT
    def getTenantRating(self, tenant_id):
        query = "select avg(rating) from tenant_ratings where tenant_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (tenant_id,))
        result = cursor.fetchone()[0]
        cursor.close()
        if not result:
            result = 0
        print(result)
        return result

    def postTenantRating(self, tenant_id, landlord_id, rating):
        query = "insert into tenant_ratings(tenant_id, landlord_id, rating) values(%s, %s, %s);"
        cursor = self.conn.cursor()
        cursor.execute(query, (tenant_id, landlord_id, rating, ))
        self.conn.commit()
        cursor.close()
        return "POST Complete"

    # Property
    def getPropertyRating(self, property_id):
        query = "select avg(rating) from property_ratings where property_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (property_id,))
        result = cursor.fetchone()[0]
        cursor.close()
        if not result:
            result = 0
        print(result)
        return result

    def postPropertyRating(self, tenant_id, property_id, rating):
        query = "insert into property_ratings(tenant_id, property_id, rating) values(%s, %s, %s);"
        cursor = self.conn.cursor()
        cursor.execute(query, (tenant_id, property_id, rating, ))
        self.conn.commit()
        cursor.close()
        return "POST Complete"

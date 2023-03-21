from config.credentials import pg_config
import psycopg2


class PropertiesDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'],
                                                                            pg_config['user'],
                                                                            pg_config['password'],
                                                                            pg_config['port'],
                                                                            pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    # SELECT
    def getAllProperties(self):
        query = "select * from properties;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            print(row)
            result.append(row)
        cursor.close()
        return result

    def getProperty(self, landlord_id):
        query = "select property_id, landlord_id, address, bedrooms, bathrooms, pictures from properties where landlord_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        return cursor.fetchone()

    # INSERT
    def addProperty(self, landlord_id, address, bedrooms, bathrooms, pictures):
        query = "insert into properties(landlord_id, address, bedrooms, bathrooms, pictures) values(%s, %s, %s, %s, %s) returning property_id;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id, address,
                       bedrooms, bathrooms, pictures))
        property_id = cursor.fetchone()[0]
        self.conn.commit()
        cursor.close()
        return property_id

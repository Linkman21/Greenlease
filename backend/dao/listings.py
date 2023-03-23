from config.credentials import pg_config
import psycopg2


class ListingsDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'],
                                                                            pg_config['user'],
                                                                            pg_config['password'],
                                                                            pg_config['port'],
                                                                            pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    # SELECT
    def getAllListings(self):
        query = "select listing_id, landlord_id, property_id, name, address, bedrooms, bathrooms, pictures, title, description, pet_flag, date_listed, price from listings natural join properties;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            print(row)
            result.append(row)
        cursor.close()
        return result

    def getListings(self, landlord_id):
        query = "select listing_id, landlord_id, property_id, name, address, bedrooms, bathrooms, pictures, title, description, pet_flag, date_listed, price from listings natural join properties where landlord_id=%s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        result = []
        for row in cursor:
            print(row)
            result.append(row)
        cursor.close()
        return result

    # INSERT
    def addListing(self, landlord_id, property_id, title, description, pet_flag, price):
        query = "insert into listings(landlord_id, property_id, title, description, pet_flag, price) values(%s, %s, %s, %s, %s, %s) returning listing_id, date_listed;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id, property_id, title,
                       description, pet_flag, price,))
        self.conn.commit()
        cursor.close()
        return self.getListings(landlord_id)

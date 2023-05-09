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
        query = "select property_id, landlord_id, name, address, bedrooms, bathrooms, pictures, case when exists (select 1 from property_ratings where property_ratings.property_id=properties.property_id) then (select avg(rating) from property_ratings where property_ratings.property_id=properties.property_id) else 0 end property_rating from properties;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            # print(row)
            result.append(row)
        cursor.close()
        return result

    def getProperties(self, landlord_id):
        query = "select property_id, landlord_id, name, address, bedrooms, bathrooms, pictures, case when exists (select 1 from property_ratings where property_ratings.property_id=properties.property_id) then (select avg(rating) from property_ratings where property_ratings.property_id=properties.property_id) else 0 end property_rating from properties where landlord_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        result = []
        for row in cursor:
            # print(row)
            result.append(row)
        cursor.close()
        return result

    # INSERT
    def addProperty(self, landlord_id, name, address, bedrooms, bathrooms, pictures):
        query = "insert into properties(landlord_id, name, address, bedrooms, bathrooms, pictures) values(%s, %s, %s, %s, %s, %s) returning property_id;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id, name, address,
                       bedrooms, bathrooms, pictures,))
        self.conn.commit()
        cursor.close()
        return "POST Success"

    # DELETE
    def deleteProperty(self, property_id):
        query = "delete from listings where property_id=%s; delete from property_ratings where property_id=%s; delete from contracts where property_id=%s; delete from properties where property_id=%s returning *;"
        cursor = self.conn.cursor()
        cursor.execute(query, (property_id, property_id,
                       property_id, property_id,))
        self.conn.commit()
        cursor.close()
        return "DELETE Success"

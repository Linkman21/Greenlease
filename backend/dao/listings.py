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
        query = "select listing_id, landlord_id, property_id, name, address, bedrooms, bathrooms, pictures, title, description, pet_flag, date_listed, price, first_name, last_name, phone, case when exists (select 1 from property_ratings where property_ratings.property_id=properties.property_id) then (select avg(rating) from property_ratings where property_ratings.property_id=properties.property_id) else 0 end property_rating, case when exists (select 1 from landlord_ratings where landlord_ratings.landlord_id=landlords.landlord_id) then (select avg(rating) from landlord_ratings where landlord_ratings.landlord_id=landlords.landlord_id) else 0 end landlord_rating from listings natural join properties natural join landlords natural join users;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            # print(row)
            result.append(row)
        cursor.close()
        return result

    def getListings(self, landlord_id):
        query = "select listing_id, landlord_id, property_id, name, address, bedrooms, bathrooms, pictures, title, description, pet_flag, date_listed, price, first_name, last_name, phone, case when exists (select 1 from property_ratings where property_ratings.property_id=properties.property_id) then (select avg(rating) from property_ratings where property_ratings.property_id=properties.property_id) else 0 end property_rating, case when exists (select 1 from landlord_ratings where landlord_ratings.landlord_id=landlords.landlord_id) then (select avg(rating) from landlord_ratings where landlord_ratings.landlord_id=landlords.landlord_id) else 0 end landlord_rating from listings natural join properties natural join landlords natural join users where landlord_id=%s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (landlord_id,))
        result = []
        for row in cursor:
            # print(row)
            result.append(row)
        cursor.close()
        return result

    def getFilteredListings(self, search, bedrooms, bathrooms, pets):
        query = "select listing_id, landlord_id, property_id, name, address, bedrooms, bathrooms, pictures, title, description, pet_flag, date_listed, price, first_name, last_name, phone, case when exists (select 1 from property_ratings where property_ratings.property_id=properties.property_id) then (select avg(rating) from property_ratings where property_ratings.property_id=properties.property_id) else 0 end property_rating, case when exists (select 1 from landlord_ratings where landlord_ratings.landlord_id=landlords.landlord_id) then (select avg(rating) from landlord_ratings where landlord_ratings.landlord_id=landlords.landlord_id) else 0 end landlord_rating from listings natural join properties natural join landlords natural join users where (title ilike %s or description ilike %s or name ilike %s or address ilike %s or first_name ilike %s or last_name ilike %s) "
        string = "%"
        if search:
            string += search + "%"
        args = (string, string, string, string, string, string)
        if bedrooms:
            query += "and bedrooms=%s"
            args += (bedrooms,)
        if bathrooms:
            query += "and bathrooms=%s"
            args += (bathrooms,)
        if pets:
            query += "and pet_flag=%s"
            args += (pets,)
        query += ";"
        cursor = self.conn.cursor()
        cursor.execute(query, args,)
        result = []
        for row in cursor:
            # print(row)
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
        return "POST Success"

    # DELETE
    def deleteListing(self, listing_id):
        query = "delete from listings where listing_id=%s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (listing_id,))
        self.conn.commit()
        cursor.close()
        return "DELETE Success"

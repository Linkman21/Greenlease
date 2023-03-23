from config.credentials import pg_config
import psycopg2


class UsersDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'],
                                                                            pg_config['user'],
                                                                            pg_config['password'],
                                                                            pg_config['port'],
                                                                            pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    # SELECT
    def getUser(self, email, password, type):
        query = "select user_id, email, password, first_name, last_name, phone, tenant_id from users natural join tenants where email = %s and password = %s;"
        if type == 'landlord':
            query = "select user_id, email, password, first_name, last_name, phone, landlord_id from users natural join landlords where email = %s and password = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (email, password,))
        return cursor.fetchone()

    # INSERT
    def addUser(self, email, password, first_name, last_name, phone, type):
        query = "insert into users(email, password, first_name, last_name, phone) values(%s, %s, %s, %s, %s) returning user_id;"
        cursor = self.conn.cursor()
        cursor.execute(query, (email, password, first_name, last_name, phone))

        user_id = cursor.fetchone()[0]
        query = "insert into tenants(user_id) values(%s)"
        if type == "landlord":
            query = "insert into landlords(user_id) values(%s)"
        cursor.execute(query, (user_id,))

        self.conn.commit()
        cursor.close()

        return self.getUser(email, password, type)

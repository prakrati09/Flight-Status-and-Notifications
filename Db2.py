import psycopg2

conn = psycopg2.connect(
    dbname="flight_status_db",
    user="username",
    password="password",
    host="localhost"
)

cursor = conn.cursor()

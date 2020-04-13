import mysql.connector as mysql


db = mysql.connect(
    host="localhost",
    user="root",
    passwd="tae9205",
    database="poongdung"
)

cursor = db.cursor()

cursor.execute("SELECT * FROM hangang_temp")

print(cursor.fetchall())

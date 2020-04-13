import mysql.connector as mysql
from get_data import arr_data


db = mysql.connect(
    host="localhost",
    user="root",
    passwd="tae9205",
    database="poongdung"
)


for i in arr_data:
    db_query = f"INSERT INTO hangang_temp (date, time, temperature) VALUES ({i['date']},{i['time']},{i['temperature']})"

    cursor = db.cursor()
    cursor.execute(db_query)
    db.commit()
    cursor.close()

cursor = db.cursor()
cursor.execute("SELECT * FROM hangang_temp")

print(cursor.fetchall())

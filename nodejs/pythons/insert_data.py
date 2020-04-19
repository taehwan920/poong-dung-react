import mysql.connector as mysql
import os
import time
import env
from by_schedule import arr_data


db = mysql.connect(
    host=env.ENV["DB_HOST"],
    user=env.ENV["DB_USER"],
    passwd=env.ENV["DB_PWD"],
    database=env.ENV["DB_DB"]
)

print(arr_data)

try:
    db_query = f"INSERT INTO hangang_temp (date, time, temperature) VALUES ({arr_data[0]['date']},{arr_data[0]['time']},{arr_data[0]['temperature']})"

    cursor = db.cursor()
    cursor.execute(db_query)
    db.commit()
    cursor.close()

    print("Server inserted new data to DB!")

    # 서버 확인용 메시지
    cursor = db.cursor()
    cursor.execute(
        "SELECT * FROM ( SELECT * FROM hangang_temp ORDER BY id DESC LIMIT 1) sub ORDER BY id ASC")

    print(f"this is new data! => {cursor.fetchall()}")
except:
    print("Error occured during fetching data!")
    print("insert_data.py will restart after 15minutes.")
    time.sleep(900)
    print("restart")
    os.system('python insert_data.py')

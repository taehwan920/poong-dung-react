import mysql.connector as mysql
from by_schedule import arr_data


db = mysql.connect(
    host="localhost",
    user="root",
    passwd="tae9205",
    database="poongdung"
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
    raise Exception("Error occured")

import mysql.connector as mysql
import env

db = mysql.connect(
    host=env.ENV["DB_HOST"],
    user=env.ENV["DB_USER"],
    passwd=env.ENV["DB_PWD"],
    database=env.ENV["DB_DB"]
)

db_query = "SELECT * FROM ( SELECT * FROM hangang_temp ORDER BY id DESC LIMIT 5) sub ORDER BY id ASC "

cursor = db.cursor()
cursor.execute(db_query)

print("this is test.", cursor.fetchall())

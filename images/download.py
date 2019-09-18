import mysql.connector
from mysql.connector import Error
import wget


try: 
    connection = mysql.connector.connect(host='104.248.156.237',
                                         database='notebook',
                                         user='root',
                                         password='P@ssw0rd')

    if connection.is_connected():
      db_Info = connection.get_server_info()
      print("Connected to MySQL Server version ", db_Info)
      cursor = connection.cursor()
      cursor.execute("select filename from picture")
      record = cursor.fetchall()
      for row in record:
        url = row[0]
        filename = wget.download(url)

except Error as e:
    print("Error while connecting to MySQL", e);
finally:
    if (connection.is_connected()):
        cursor.close()
        connection.close()
        print("MySQL connection is closed")
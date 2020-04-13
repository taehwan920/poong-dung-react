import requests

start_page = 0
end_page = 999
endpoint = f"http://openapi.seoul.go.kr:8088/566261794c7461653638534c656f6d/JSON/WPOSInformationTime/{start_page}/{end_page}"


arr_data = []
response = requests.get(endpoint)
data = response.json()

while

print(data)

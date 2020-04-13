import requests
import json

start_page = 0
end_page = 999
endpoint = f"http://openapi.seoul.go.kr:8088/566261794c7461653638534c656f6d/JSON/WPOSInformationTime/{start_page}/{end_page}"

arr_data = []


def is_joong(obj):
    if obj['SITE_ID'] == '중랑천':
        return True


def by_scheduler(obj):
    if obj['MSR_TIME'] == '00:00' or '06:00' or '12:00' or '18:00':
        return True


def refine_obj(obj):
    return {
        'date': obj['MSR_DATE'],
        'time': int(obj['MSR_TIME'][0:2]),
        'temperature': float(obj['W_TEMP'])
    }


def obj_factory(li):
    refine1 = list(filter(lambda item: is_joong(item), li))
    refine2 = list(filter(lambda item: by_scheduler(item), refine1))
    refine3 = list(map(lambda item: refine_obj(item), refine2))
    return refine3


while end_page < 4000:
    response = requests.get(endpoint)
    data = response.json()["WPOSInformationTime"]["row"]
    refined = obj_factory(data)
    arr_data += refined
    start_page += 1000
    end_page += 1000

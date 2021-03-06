import requests


def is_joong(obj):
    if obj['SITE_ID'] == '중랑천':
        return True


def by_scheduler(obj):
    if obj['MSR_TIME'] == '24:00':
        return True
    if obj['MSR_TIME'] == '06:00':
        return True
    if obj['MSR_TIME'] == '12:00':
        return True
    if obj['MSR_TIME'] == '18:00':
        return True


def refine_obj(obj):
    return {
        'date': obj['MSR_DATE'],
        'time': int(obj['MSR_TIME'][0:2]),
        'temperature': float(obj['W_TEMP']) if obj['W_TEMP'] != '점검중' else 12.5
    }


def obj_factory(li):
    refine1 = list(filter(lambda item: is_joong(item), li))
    refine2 = list(filter(lambda item: by_scheduler(item), refine1))
    refine3 = list(map(lambda item: refine_obj(item), refine2))
    return refine3


start_page = 1
end_page = 20

arr_data = []

endpoint = f"http://openapi.seoul.go.kr:8088/566261794c7461653638534c656f6d/JSON/WPOSInformationTime/{start_page}/{end_page}"
response = requests.get(endpoint)
data = response.json()["WPOSInformationTime"]["row"]
refined = obj_factory(data)
arr_data += refined

arr_data.reverse()

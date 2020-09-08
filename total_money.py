import json

menu_list = ["아이스아메리카노", "아메리카노"]
money_list = [2200, 2200]

def lambda_handler(event, context):
    # TODO implement
    request_body = json.loads(event['body'])
    menu = str(request_body['action']['params']['menu'])
    num = int(request_body['action']['params']['num'])

    global menu_list
    global money_list

    x = 0

    for x in range(len(menu_list)):
        if menu == menu_list[x]:
            total_money = int(money_list[x] * num)
            return total_money
            break
        else:
            a = a + 1

    result = {
        "version": "2.0",
        "data": {
            "menu": menu,
            "num": num,
            "total_money": total_money
        }
    }

    print(json.dumps(result))

    return {
        'statusCode': 200,
        'body': json.dumps(result),
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    }

lambda_handler()
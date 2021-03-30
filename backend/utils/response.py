from django.http import JsonResponse

# 统一的返回结果，按实际情况修改
# 当然也可以可以自定义一个类
# 操作成功时只返回状态码code和数据data，（成功了就不需要message，同理失败了自然也不需要data）


def ok(data):
    return JsonResponse({'code': 20000, 'data': data})


# 操作失败时只返回状态码code和错误信息message
def error(message):
    return JsonResponse({'code': 20001, 'message': message})

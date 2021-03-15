from django.http import JsonResponse

# 统一的返回结果，按实际情况修改
# 当然也可以可以自定义一个类
# 操作成功时只返回状态码code和数据data，（成功了就不需要message，同理失败了自然也不需要data）


def ok(data):
    return {'code': 20000, 'data': data}


# 操作失败时只返回状态码code和错误信息message
def error(message):
    return {'code': 20001, 'message': message}


# 翻译接口
def translate(request):
    text = request.GET.get('text')
    print(text)
    # 这里演示了ok() 和 error() 的使用方法
    if len(text) > 4:
        return JsonResponse(ok({'result': text}))
    else:
        return JsonResponse(error('发送过来的词长度小于4'))


# 标注数据上传接口
def annotate_data_upload(request):
    # 上传的数据中每种类型可能会有多个词，所以还要进行分词操作，这里就不做了
    if request.method == 'POST':
        data = request.body
        print(data.decode('utf-8'))
    return JsonResponse(ok({}))


# 文本分析文件上传
def error_analysis_file_upload(request):
    file = request.FILES.get('analysis_file')
    print(file)
    return JsonResponse(ok({'file': 'django'}))

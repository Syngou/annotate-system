# -*- coding: utf-8 -*-
import json

from django.http import HttpResponse


# 统一的返回结果，按实际情况修改
def r(code, message, data):
    return {'code': code, 'message': message, 'data': data}


# 翻译接口
def translate_view(request):
    text = request.GET.get('text')
    return HttpResponse(
        json.dumps(r(20000, '发送过来的数据为==>  ' + text + '  \n翻译结果为...', {})))


# 标注数据上传接口
def upload_view(request):
    # 上传的数据中每种类型可能会有多个词，所以还要进行分词操作，这里就不做了
    if request.method == 'POST':
        data = request.body
        print(data.decode('utf-8'))

    return HttpResponse(json.dumps(r(20000, '上传成功', {})))


# 文本分析文件上传
def error_analysis_file_upload(request):
    file = request.FILES.get('file')
    print(file)
    string = file.read().decode('utf-8')

    return HttpResponse(json.dumps(r(20000, '上传成功', {'file': string})))

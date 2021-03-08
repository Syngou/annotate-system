import json

from django.http import HttpResponse
from django.shortcuts import render

from .models import *


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

    relation = request.GET.get('relation')
    medicine = request.GET.get('medicine')
    disease = request.GET.get('disease')
    tool = request.GET.get('tool')

    result = AnnotateData(relation=relation,
                          disease=disease,
                          tool=tool,
                          medicine=medicine)
    result.save()
    return HttpResponse(
        json.dumps(
            r(
                20000, '上传成功', {
                    'relation': relation,
                    'medicine': medicine,
                    'disease': disease,
                    'tool': tool
                })))


def error_analysis_file_upload(request):
    file = request.FILES.get('analysis_file')
    print(file)
    return HttpResponse(
        json.dumps(
            r(
                20000, '上传成功', {
                    'file': 'file'
                }
            )
        )
    )

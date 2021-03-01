import json
from django.http import HttpResponse
from django.shortcuts import render
from .models import *


def r(code, message, data):
    return {'code': code, 'message': message, 'data': data}


def translate_view(request):
    text = request.GET.get('text')
    return HttpResponse(json.dumps(r(20000, '发送过来的数据为==>  ' + text + '  \n翻译结果为...', {})))


def upload_view(request):
    # 上传的数据中每种类型可能会有多个词，所以还要进行分词操作，这里就不做了

    relation = request.GET.get('relation')
    medicine = request.GET.get('medicine')
    name = request.GET.get('name')
    tool = request.GET.get('tool')

    result = AnnotateResult(relation=relation, name=name, tool=tool, medicine=medicine)
    result.save()
    return HttpResponse(
        json.dumps(
            r(20000, '上传成功',
              {'relation': relation,
               'medicine': medicine,
               'name': name,
               'tool': tool
               })))

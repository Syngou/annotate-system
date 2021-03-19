from django.http import JsonResponse

from .response import error, ok


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

import json

from .find_error import Data, correct_statis, error_statis
from .utils import *


# Create your views here.
# 文本分析文件上传
def error_analysis_file_upload(request):
    file = request.FILES.get('analysis_file')
    import os
    if not os.path.exists('upload_file'):
        os.mkdir('upload_file')
    with open(os.path.join(os.getcwd(), 'upload_file', file.name), 'wb') as fw:

        data = Data(os.path.join(os.getcwd(), 'upload_file', file.name))

        python2json = {}

        # 得到所有句子每个词信息
        sen_info = data.get_word_info()
        python2json['sentences'] = sen_info

        # 实体类型
        entity_type = data.get_entity_type()
        python2json['entity_type'] = entity_type

        # 标准实体个数分布以及预测正确实体分布
        gold, correct = correct_statis(data)
        python2json['line_graph'] = [gold, correct]

        # 错误类型个数统计
        error_type = error_statis(data)
        python2json['chart_graph'] = error_type

        json_str = json.dumps(python2json, ensure_ascii=False)

        return ok({'data': json_str})

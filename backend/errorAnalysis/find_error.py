'''
A tool of errors analysis for NER tasks
@author: xiongying
@date:2021-03-14
'''


# 按行返回文件内容
def read_lines(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return f.readlines()


# 一次性返回文件内容
def read_data(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return f.read()


class Data(object):
    def __init__(self, data_file_lines):
        self.data_file_lines = data_file_lines
        self.sentences, self.entity_type = self.get_data_sens()

    # 切分句子，返回句子以及每个句子中的gold和pre标签，返回实体类型
    def get_data_sens(self):
        lines = self.data_file_lines
        sentences = []
        entity_type = []
        sen = []
        gold = []
        pre = []
        for line in lines:
            line = line.strip()
            if len(line) == 0:
                sentences.append((sen, gold, pre))
                sen = []
                gold = []
                pre = []
            else:
                line = line.split('\t')
                sen.append(line[0])
                gold.append(line[1])
                pre.append(line[-1])
                if line[1] != 'O':
                    ty = line[1].split('-')[-1]
                    if ty not in entity_type:
                        entity_type.append(ty)
        return sentences, entity_type

    # 按句子返回每个字的实际标签和预测标签
    def get_word_info(self):
        lines = self.data_file_lines
        sentences = []
        sentence = []
        for line in lines:
            line = line.strip()
            if len(line) == 0:
                sentences.append(sentence)
                sentence = []
            else:
                line = line.split('\t')
                word_dict = {}
                word_dict['text'] = line[0]
                word_dict['standard_type'] = line[1].split(
                    '-')[-1] if '-' in line[1] else 'O'
                word_dict['predict_type'] = line[-1].split(
                    '-')[-1] if '-' in line[-1] else 'O'
                word_dict['standard_label'] = line[1].split(
                    '-')[0] if '-' in line[1] else 'O'
                word_dict['predict_label'] = line[-1].split(
                    '-')[0] if '-' in line[-1] else 'O'
                sentence.append(word_dict)
        return sentences

    # 得到所有的句子，形式为（句子列表，标准标签列表，预测标签列表）
    # （['Number', 'of', 'glucocorticoid', 'receptors', 'in', 'lymphocytes', 'and', 'their', 'sensitivity', 'to', 'hormone', 'action', '.'],
    #   ['O', 'O', 'B-protein', 'I-protein', 'O', 'B-cell_type', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    #  ['O', 'O', 'B-protein', 'I-protein', 'I-protein', 'I-protein', 'I-protein', 'I-protein', 'I-protein', 'O', 'B-cell_type', 'I-cell_type', 'I-cell_type']
    def get_sentences(self):
        return self.sentences

    # 返回实体类型列表
    # ['protein', 'cell_type', 'DNA', 'cell_line', 'RNA']
    def get_entity_type(self):
        return self.entity_type

    # 得到每个句子的标准实体，形式为[起始位置，终止位置，类型]
    # [[2, 3, 'protein'], [5, 5, 'cell_type']]

    def get_sen_gold_entity(self, gold_lines):
        chunks = []
        chunk = [-1, -1, -1]
        for indx, tag in enumerate(gold_lines):
            if tag.startswith("B-"):
                if chunk[1] != -1:
                    chunks.append(chunk)
                chunk = [-1, -1, -1]
                chunk[0] = indx
                chunk[-1] = tag.split('-')[1]
                chunk[1] = indx
                if indx == len(gold_lines) - 1:
                    chunks.append(chunk)
            elif tag.startswith('I-') and chunk[0] != -1:
                _type = tag.split('-')[1]
                if _type == chunk[-1]:
                    chunk[1] = indx

                if indx == len(gold_lines) - 1:
                    chunks.append(chunk)
            else:
                if chunk[1] != -1:
                    chunks.append(chunk)
                chunk = [-1, -1, -1]
        return chunks

    # 得到每个句子的预测实体和转移错误的位置。形式[起始位置，终止位置，类型]
    # [[2, 8, 'protein'], [10, 11, 'cell_type']]

    def get_sen_pre_entity(self, pre_lines):
        chunks = []
        errors = []
        chunk = [-1, -1, -1]
        error = [-1, -1]
        for indx, tag in enumerate(pre_lines):
            if tag.startswith("B-"):
                if chunk[1] != -1:
                    chunks.append(chunk)
                chunk = [-1, -1, -1]
                chunk[0] = indx
                chunk[-1] = tag.split('-')[1]
                chunk[1] = indx
                if indx == len(pre_lines) - 1:
                    chunks.append(chunk)
            elif tag.startswith('I-') and chunk[0] != -1:
                _type = tag.split('-')[1]
                if _type == chunk[-1]:
                    chunk[1] = indx
                    if indx == len(pre_lines) - 1:
                        chunks.append(chunk)
                else:
                    error[0] = chunk[0]
                    error[1] = indx
                    errors.append(error)
                    chunk = [-1, -1, -1]

            else:
                if chunk[1] != -1:
                    chunks.append(chunk)
                chunk = [-1, -1, -1]
        return chunks, errors


# 错误统计
def error_class(data):
    more_predict = []  # 多预测
    less_predict = []  # 少预测
    type_errors = []  # 类型错误
    mix_errors = []  # 边界交集
    trans_errors = []  # 转移错误
    leaf_errors = []  # 漏预测
    aband_errors = []  # 冗余预测
    corrects = []  # 正确预测

    sens = []
    more_pred = []  # 多预测
    less_pred = []  # 少预测
    type_error = []  # 类型错误
    mix_error = []  # 边界交集
    leaf_error = []  # 漏预测
    aband_error = []  # 冗余预测
    correct = []  # 正确预测
    sentences = data.get_data_sens()
    # print(sentences[0])
    for s in sentences[0]:
        sen, gold, pre = s
        gold_en = data.get_sen_gold_entity(gold)
        pre_en, pre_error = data.get_sen_pre_entity(pre)  # 转移错误
        gold_tag = [0] * len(gold_en)
        # print(gold_tag)
        pre_tag = [0] * len(pre_en)
        for i, g_e in enumerate(gold_en):
            g_st, g_ed, g_ty = g_e
            for j, p_e in enumerate(pre_en):
                p_st, p_ed, p_ty = p_e
                if gold_tag[i] == 0 and pre_tag[j] == 0 and (
                        p_st == g_st and p_ed == g_ed
                        and g_ty == p_ty):  # 预测正确
                    correct.append([g_e, p_e])
                    gold_tag[i] = 1
                    pre_tag[j] = 1
                elif gold_tag[i] == 0 and pre_tag[j] == 0 and (
                        (p_st >= g_st and p_ed < g_ed) or
                        (p_st > g_st and p_ed <= g_ed)):  # 少预测
                    less_pred.append([g_e, p_e])
                    gold_tag[i] = 1
                    pre_tag[j] = 1
                elif gold_tag[i] == 0 and pre_tag[j] == 0 and (
                        (p_st <= g_st and p_ed > g_ed) or
                        (p_st < g_st and p_ed >= g_ed)):  # 多预测
                    more_pred.append([g_e, p_e])
                    gold_tag[i] = 1
                    pre_tag[j] = 1
                elif gold_tag[i] == 0 and pre_tag[j] == 0 and (
                        p_st == g_st and p_ed == g_ed
                        and g_ty != p_ty):  # 类型错误
                    type_error.append([g_e, p_e])
                    gold_tag[i] = 1
                    pre_tag[j] = 1
                elif gold_tag[i] == 0 and pre_tag[j] == 0 and (
                        (p_st < g_st and p_ed > g_st and p_ed < g_ed) or
                        (p_st > g_st and p_st < g_ed and p_ed < g_ed)):  # 预测交叉
                    mix_error.append([g_e, p_e])
                    gold_tag[i] = 1
                    pre_tag[j] = 1

        for i in range(len(gold_tag)):
            if gold_tag[i] == 0:
                leaf_error.append(gold_en[i])
        for i in range(len(pre_tag)):
            if pre_tag[i] == 0:
                aband_error.append(pre_en[i])

        leaf_errors.append(leaf_error)
        aband_errors.append(aband_error)
        more_predict.append(more_pred)
        less_predict.append(less_pred)
        type_errors.append(type_error)
        mix_errors.append(mix_error)
        trans_errors.append(pre_error)
        corrects.append(correct)

        sens.append(sen)
        more_pred = []  # 多预测
        less_pred = []  # 少预测
        type_error = []  # 类型错误
        mix_error = []  # 边界交集
        leaf_error = []  # 漏预测
        aband_error = []  # 冗余预测
        correct = []

    return sens, more_predict, less_predict, type_errors, mix_errors, trans_errors, leaf_errors, aband_errors, corrects


# 错误统计,统计类型的错误个数，返回类型列表和对应的错误个数列表
def error_statis(data):
    sens, more_preds, less_predict, type_errors, mix_errors, trans_errors, leaf_errors, aband_errors, _ = error_class(
        data)
    more_co = 0
    less_co = 0
    type_co = 0
    mix_co = 0
    trans_co = 0
    leaf_co = 0
    aband_co = 0
    for i in range(len(sens)):
        if len(more_preds[i]) > 0:
            more_co += 1
        if len(less_predict[i]) > 0:
            less_co += 1
        if len(type_errors[i]) > 0:
            type_co += 1
        if len(mix_errors[i]) > 0:
            mix_co += 1
        if len(trans_errors[i]) > 0:
            trans_co += 1
        if len(leaf_errors[i]) > 0:
            leaf_co += 1
        if len(aband_errors[i]) > 0:
            aband_co += 1
    error_type = [
        'more_preds', 'less_predict', 'type_errors', 'mix_errors',
        'trans_errors', 'leaf_errors', 'aband_errors'
    ]
    error_number = [
        more_co, less_co, type_co, mix_co, trans_co, leaf_co, aband_co
    ]
    error_dis = {}
    for i in range(len(error_type)):
        error_dis[error_type[i]] = error_number[i]

    return error_dis


# 标准实体和预测正确实体分布
def correct_statis(data):
    _, _, _, _, _, _, _, _, corrects = error_class(data)
    sentences = data.get_data_sens()
    gold_dis = {}
    # 标准实体分布
    for s in sentences[0]:
        sen, gold, pre = s
        gold_en = data.get_sen_gold_entity(gold)
        for i, g_e in enumerate(gold_en):
            _, _, ty = g_e
            if ty not in gold_dis:
                gold_dis[ty] = 1
            else:
                gold_dis[ty] += 1
    # 预测正确实体分布
    pre_correct_dis = {}
    for correct in corrects:
        for _, p in correct:
            _, _, ty = p
            if ty not in pre_correct_dis:
                pre_correct_dis[ty] = 1
            else:
                pre_correct_dis[ty] += 1
    return gold_dis, pre_correct_dis

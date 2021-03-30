import hashlib
import time

import numpy as np


def header():
    return {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language':
        'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':
        'OUTFOX_SEARCH_USER_ID=1015613889@112.65.124.62;    UM_distinctid=177d76febd41f0-06d8a2243cf94b8-445a68-13c680-177d76febd54f5; YOUDAO_MOBILE_ACCESS_TYPE=1;    OUTFOX_SEARCH_USER_ID_NCOO=716731006.2986639; SESSION_FROM_COOKIE=www.baidu.com;   JSESSIONID=aaavWlNzyVXcxaa16BxFx; ___rl__test__cookies=1614246732786',
        'Origin': 'http://fanyi.youdao.com',
        'Referer': 'http://fanyi.youdao.com/',
        'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.   36',
        'X-Requested-With': 'XMLHttpRequest'
    }


def keydata(text):
    # 有道反爬虫机制的破解后
    lts = int(round(time.time() * 1000))
    lts = str(lts)
    salt = lts + str(int(np.random.random() * 10))
    sign = 'fanyideskweb' + text + salt + 'Tbh5E8=q6U3EXe+&L[4c@'
    sign = hashlib.md5(sign.encode(encoding='UTF-8')).hexdigest()
    return {
        'i': text,
        'from': 'AUTO',
        'to': 'AUTO',
        'smartresult': 'dict',
        'client': 'fanyideskweb',
        'salt': salt,
        'sign': sign,
        'lts': lts,
        'bv': 'cda1e53e0c0eb8dd4002cefc117fa588',
        'version': '2.1',
        'keyfrom': 'fanyi.web',
        'action': 'FY_BY_REALTlME'
    }

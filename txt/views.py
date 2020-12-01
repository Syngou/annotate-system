'''
Author: Syngou
Date: 2020-11-13 16:37:41
LastEditTime: 2020-11-30 00:25:08
Description: 页面
LastEditor: Syngou
'''
from django.shortcuts import render


def txtProcess(request):
    return render(request, 'textProcessSystem.html')

import smtplib
from email.mime.text import MIMEText
from email.header import Header
from random import randint

smtpObj=smtplib.SMTP("smtp-mail.outlook.com",587)
smtpObj.ehlo()
smtpObj.starttls()
email_address="annotateMaster@outlook.com"
secret_password="xzx_hitsz"
smtpObj.login(email_address,secret_password)
recipient="pnxzx@outlook.com"
randNum='{:0>4d}'.format(randint(0,9999))
# 三个参数：第一个为正文内容，第二个为 plain 设置格式，第三个为 utf-8 设置编码
msg=MIMEText("已收到您的密码重设要求，请输入验证码："+str(randNum)+"。\n感谢您对我们的支持，再次希望你在平台的体验有益和愉快。\n",\
             'plain',\
             'utf-8')
msg['From']=Header("Annotate-Master",'utf-8')  # 发送者
msg['To'] =  recipient      # 接收者,邮箱地址字符串
msg['Subject'] = Header("重设帐号密码", 'utf-8') # 主题内容
try:
    smtpObj.sendmail(email_address,recipient,msg.as_string())
except BaseException: # 所有异常的基类
    print("邮件发送失败呜呜呜！")
else:
    print("邮件发送成功哈哈哈！")
smtpObj.quit()
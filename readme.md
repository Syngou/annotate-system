# 文本标注和处理系统
## 简介
文本标注和处理系统，包含标注，后台管理，错误分析等功能  
> 本项目目前处于开发阶段  
> 界面UI后期再美化，目前先搞好功能  
> 为避免频繁打包，在开发阶段采用前后端分离  
> 所写接口仅为前后端交互的示例，可以按实际情况进行修改  
## 开发环境一览:

| 项目 | 版本号 |
| ----| ----|
|python |3.9|
|django|3.1.7|
|node|14.15.3|

> 开发环境不一定要一模一样，版本相近即可   

## 项目结构

- backend  
  1. api  
        - views.py 定义后端接口  
        - urls.py 路由分配
        - find_error.py 解析 错误分析文件   
  2. upload_file 上传的文件（可以自定义，图片可以存数据库，也可以保存为文件）

- frontend (主要代码在src目录下)
   1. api 定义接口，与后端交互
   2. assets 存放登录背景图，404图片
   3. components 后台管理页面的组件
   4. icons 图标
   5. layout 后台管理页面的布局
   6. router 前端路由
   7. store 状态存储
   7. utils 工具集
   8. views 前端页面（每一个文件就是一个页面）

> 其中，test.vue 为开发时使用的测试页面，因为后端返回的是json数据   
> 可以先在这个页面调用后端接口，看接口写得是否正确，调用成功了再到相应页面调用该接口   
> 也可以自定义一下组件看效果等等。  
> 这个看个人需要了。

## 项目逻辑
1. 登录或注册，成功后请求头会带上 token (名为 annotate-system-token)
2. 后台根据 token 获取用户信息并传给前端
3. 标注前，需要上传标注文本，定义好标签。
4. 标注完成后可以导出数据（json，jsonl，txt格式都可以）
5. 错误分析文本 和 标注文本 的模板已给出（即那两个 xx_demo.txt)，可以试着上传看看效果
## Usage
* 下载或克隆源码
* 先安装一下依赖
```
pip3 install -r requirements.txt
```
* 进入到backend文件夹中(manage.py所在目录)
* 运行后端服务器
```
python manage.py runserver
```
* 新建终端，进入到frontend文件夹中
* 在命令行中输入以下命令，会打开前端页面
```
npm install
npm run serve
```
* 之后就不用运行npm install 命令了
* 第一次使用时注册一个账号即可（数据全部存储在 后端的 db.sqlite3 文件中
* 当然也可以更改数据，具体看网上教程即可

## License  
MIT


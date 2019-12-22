## node.js
- node是基于chromeV8引擎，能够让js运行在服务端，通过npm去下载功能模块包。js能够写前端也能写后端，是真正实现前后统一的全栈工程师。
- 了解Deno即可，可能需要刮起一阵新的浪潮
- 学习的目标
```
能够知道后端做了什么事情
学会写接口
为了更好的理解前端的内容
```
node的特性
+ 单线程
+ 非阻塞I/O
+ 事件驱动
- node擅长处理高密集I/O，高并发的业务，写一些小工具，前端小玩具
- node没有BOM、DOM
+ NodeJs使用的是commonjs规范(以前:AMD规范  requirejs  CMD sea.js)
  - 引入  
  ```
  require('文件')  ->  返回值是一个对象，可以通过解构的方式拿到想要的模块
  不加路径的情况：
      node自带模块
      node_modules中的模块
  ```
  - 导出
  ```
  module.exports={
      a:xxx,
      b:xxx,
  }
  ```

- http  模块  为了创建一个服务
```
http.createServer(function(request,response){}).listen(80)
  request获取客户端发送服务器的信息
    url  请求地址，地址上面有参数，还需要注意的是/favicon.ico
  response服务器发送给客户端的信息
     write("xxx")  写下要传送的信息
     end() 结束本次对话
```
- fs 文件系统
```
readFile(读的文件地址，回调函数(失败，文件数据))//异步读取
readFilesSync(读的文件地址)//同步读取，如果读取失败会报错，所以是有try...catch包一下
writeFile   添加文件
writeFileSync
unlink      删除文件
mkdir       添加文件夹
```
不管请求是找页面还是找接口，都是通过一个url的方式与后端进行交互在访问服务器的时候最好就把访问服务器要做什么事情说清楚。




## javascript之URI转义
- escape()   编码一个字符串
- unescape() 解码一个由escape()函数编码的字符串
- encodeURI()  转义一个URI中的字符  在编码不同的AJAX请求时，解决中文乱码问题要经常用到
- decodeURI()  解码一个URI中的字符
- encodeURIComponent()  转义URI组件中的字符
- decodeURIComponent() 解码一个URI组件中的字符

## res.setHeader()和res.writeHead()
```
在node.js中，http协议如果不设置响应头，中文的话在客户端浏览器是会乱码的，那么设置响应头的目的是什么，又如何设置响应头？

目的是为了告诉浏览器我发送的数据是什么类型的，你应该用什么格式来编码显示。如果不设置，会自动生成一个响应头，但中文的话浏览器会乱码。
```
在http协议中， Content-type就是用来告诉对方我给你发送的数据内容是什么类型
```
如何设置响应头，我认为有两种方法：
res.setHeader()
res.writeHead()
```
```
res.setHeader()的写法：
res.setHeader('Content-type', 'text/plain;charset=utf-8')
```
```
res.writeHead()的写法：
参数1：必选，三位数的http状态码
参数2：可选，可有可无
参数3：可选，告诉浏览器我发给你的数据是什么类型的
res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' })
```
```
res.writeHead()必须在res.end()之前调用

如果两者同时存在（没必要），要先写res.setHeader()，后写res.writeHead()，且res.writeHead()优先
```



```
什么是xsrf攻击呢？
全称是Cross Site Request Forgery，跨站域请求伪造，是网络攻击的一种，关于网络攻击以后会出一篇详细文章。那这里axios是如何通过客户端来防御xsrf呢？ 这里让你的每个请求都带一个从cookie中拿到的key，根据浏览器的同源策略，伪造的请求是拿不到你cookie的key的，这样，后台就可以轻松辨别这个请求是否是用户在假冒网站上的误导输入了，采用正确的策略进行回应。
```
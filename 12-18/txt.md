## 跨域(源)
>同源策略：一种关于安全方面的约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，那么浏览器的正常功能可能会受到影响。Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。
- 源：协议：
- >http/https(比http更加安全，因为在传输的时候需要进行安全证书的认证)
- >ftp
- >file ...
- 域名：(IP的另一个名字)=>一个IP对应着多个域名，一个域名对应着一个IP
- >www.baidu.com
- 端口
- >对应着不同的执行事件 80  8888 .....
- 同源:同协议、同域名、同端口
- 跨源：协议||域名||端口 只要有一个不同就是跨域
## 跨域的解决方案
- 1.CORS
```
88端口下访问8080端口下的/跨域端口
  需要高版本浏览的XMLHttpRequest+后端设置白名单
优点:
前端什么都不用做，只需要后台添加白名单即可
缺点:
低版本不兼容
```
```
CORS 全称是跨域资源共享（Cross-Origin Resource Sharing），是一种 ajax 跨域请求资源的方式，支持现代浏览器，IE支持10以上。
实现方式：当你使用 XMLHttpRequest 发送请求时，浏览器发现该请求不符合同源策略，会给该请求加一个请求头：Origin，后台进行一系列处理，如果确定接受请求则在返回结果中加入一个响应头：Access-Control-Allow-Origin; 浏览器判断该相应头中是否包含 Origin 的值，如果有则浏览器会处理响应，我们就可以拿到响应数据，如果不包含浏览器直接驳回，这时我们无法拿到响应数据。所以 CORS 的表象是让你觉得它与同源的 ajax 请求没啥区别，代码完全一样。


使用XMLHttpRequest发送请求，浏览器发现该请求不符合同源策略，会给该请求加一个请求头：Origin；后台进行处理，在返回结果中加入一个响应头：Access-Control-Allow-Origin；浏览器判断该相应头中是否包含 Origin的值，有则处理响应，无则直接驳回。
res.setHeader('Access-Control-Allow-Origin','127.0.0.1:8080')
res.setHeader('Access-Control-Allow-Origin','*')
```
```js
//自己的端口是80
let xhr = new XMLHttpRequest;
    xhr.open('get','http://localhost:8080/kuayu?name=hh');  
    xhr.send();
    xhr.onload = function(){
        console.log(xhr.responseText)
    } 
```
- 2.服务器代理
```
服务器能够进行跨域请求第三方资源，服务器跨域的代码又和我端同源，就等同于我端跨域第三方资源。
优点：
前端基本不用做什么，需要自己配置第三方资源路径
缺点：
主变化了自己也得跟着变化
```
```

```
- 3.jsonp
```
原理：JSONP是通过script标签加载数据的方式去获取数据当做JS代码来执行。具体操作方法：提前在页面上声明一个函数(这个函数用来处理后端返回的数据)，函数名通过接口的方式传递给后台；后台解析到函数名后在原始数据上[包裹]这个函数名(即相当于将后台返回来的数据作为函数的参数，执行该函数)，发送给前端。换句话说，JSONP 需要对应接口的后端的配合才能实现。
```
```
jsonp+padding  把数据内填充

有些标签天生就支持跨域 如
a href=""
img src=""
script src=""
link href=""
script标签会尽量解析外链资源把资源变成js代码
最后在函数块中的后面，才会接受到函数调用里面的数据
```
>jsonp需要哪些条件
```
1.全局定义一个函数
2.后端的数据要知道你定义的函数是什么名字
3.后端把数据放到函数调用括号里
4.通过script标签发送请求，等同于函数调用，还肩负传参的责任
```
>jsonp和ajax的区别
```
ajax请求来的数据不带函数名+括号
jsonp请求的数据带函数名+括号[有名函数调用]

jsonp只能是get请求，因为是通过url方式
ajax请求方式可以请求jsonp数据，但是jsonp数据不能访问到ajax数据
其中的缘由：
ajax -> xhr.responseText(fn('{"name":"kkw"}'))
jsonp -> '{"name":"kkw"}'
```
## window.open()和window.location.href=""
>打开一个网页：window.open   ->  必须人为手动来调用才会执行(点击事件等)不然会被高版本浏览器拦截

>window.open(url,)

- "top.location.href"是最外层的页面跳转
- "window.location.href"、"location.href"是本页面跳转
- "parent.location.href"是上一层页面跳转.
>location是window对象的属性，而所有的网页下的对象都是属于window作用域链中（这是顶级作用域），所以使用时是可以省略window。而top是指向顶级窗口对象，parent是指向父级窗口对象。 
```
1.window.location是window对象的属性，而window.open是window对象的方法
2.window.location是你对当前浏览器窗口的URL地址对象的参考！
3.window.open是用来打开一个新窗口的函数！
4.window.open()是可以在一个网站上打开另外的一个网站的地址而window.location()是只能在一个网站中打开本网站的网页

window.location或window.open如何指定target?
这是一个经常遇到的问题，特别是在用frame框架的时候
解决办法:
window.location 改为 top.location　即可在顶部链接到指定页
或
window.open("你的网址","_top");
<input type="button" value="新窗口打开" onclick="window.open('http://www.baidu.com')"> 
<input type="button" value="当前页打开" onclick="top.location='http://www.baidu.com','_top'">
```
## 本地存储
- 刷新之后还是有原有的局面
>解决思想：
- >1.刷新之后请求一次数据
- >2.把数据存储在浏览器中
>解决方案：
- >1.cookie
>cookie是纯文本，没有可执行代码。存储数据，当用户访问了某个网站（网页）的时候，我们就可以通过cookie来向访问者电脑上存储数据，或者某些网站为了辨别用户身份、进行session跟踪而储存在用户本地终端上的数据(通常经过加密).
- >2.localStorage
>本地存储  ==>  HTML5新方法，不过IE8及以上浏览器都兼容.
- >3.sessionStorage
>其实跟localStorage差不多，也是本地存储，会话本地存储.
## cookie ==课件在12-13文件里的public
- 后端技术，基于浏览器实现的(一般是后端来设置，也可以前端来设)
- 用来存储用户的操作信息
- 一次http请求(填写用户名密码),后端直至回到这次请求某人是否合法，http是无状态的，不能记录某人登录过账户，所以说使用cookie去存储某个操作，下次请求的时候，把上一次的操作发给后端，就知道某个人是否登录过账户
```
document.cookie   ==>读操作
document.cookie="name:kkw";  ==>写操作
document.cookie="age:22";
console.log(document.cookie)//'name=kkw; age=22 '间隔是分号空格
读操作的是:一次读取会把当前域名下的所有cookie都获取出来
格式wei:'key=val; key2=val2'  
```
### cookie前言
>网络早期最大的问题之一是如何管理状态。简而言之，服务器无法知道两个请求是否来自同一个浏览器。当时最简单的方法是在请求时，在页面中插入一些参数，并在下一个请求中传回参数。这需要使用包含参数的隐藏的表单，或者作为URL参数的一部分传递。这两个解决方案都手动操作，容易出错。cookie出现来解决这个问题。
### cookie作用
>cookie是纯文本，没有可执行代码。存储数据，当用户访问了某个网站（网页）的时候，我们就可以通过cookie来向访问者电脑上存储数据，或者某些网站为了辨别用户身份、进行session跟踪而储存在用户本地终端上的数据（通常经过加密)
### cookie如何工作
- >当网页要发http请求时，浏览器会先检查是否有相应的cookie，有则自动添加在request header中的cookie字段中。这些是浏览器自动帮我们做的，而且每一次http请求浏览器都会自动帮我们做。这个特点很重要，因为这关系到“什么样的数据适合存储在cookie中”。
- >存储在cookie中的数据，每次都会被浏览器自动放在http请求中，如果这些数据并不是每个请求都需要发给服务端的数据，浏览器这设置自动处理无疑增加了网络开销；但如果这些数据是每个请求都需要发给服务端的数据（比如身份认证信息），浏览器这设置自动处理就大大免去了重复添加操作。所以对于那种设置“每次请求都要携带的信息（最典型的就是身份认证信息）”就特别适合放在cookie中，其他类型的数据就不适合了。
### cookie特征
1. 不同的浏览器存放的cookie位置不一样，也是不能通用的。
2. cookie的存储是以域名形式进行区分的，不同的域下存储的cookie是独立的。
3. 我们可以设置cookie生效的域（当前设置cookie所在域的子域），也就是说，我们能够操作的cookie是当前域以及当前域下的所有子域
4. 一个域名下存放的cookie的个数是有限制的，不同的浏览器存放的个数不一样,一般为20个。
5.每个cookie存放的内容大小也是有限制的，不同的浏览器存放大小不一样，一般为4KB。
6. cookie也可以设置过期的时间，默认是会话结束的时候，当时间到期自动销毁。
### cookie值既可以设置，也可以读取。
```
不管你是请求一个资源文件（如 html/js/css/图片），还是发送一个ajax请求，服务端都会返回response。而response header中有一项叫set-cookie，是服务端专门用来设置cookie的。
Set-Cookie 消息头是一个字符串，其格式如下（中括号中的部分是可选的）：
Set-Cookie: value[; expires=date][; domain=domain][; path=path][; secure]

注意： 一个set-Cookie字段只能设置一个cookie，当你要想设置多个 cookie，需要添加同样多的set-Cookie字段。
服务端可以设置cookie 的所有选项： expires、domain、path、secure、HttpOnly
通过 Set-Cookie 指定的这些可选项只会在浏览器端使用，而不会被发送至服务器端。
```
### 读取
>我们通过document.cookie来获取当前网站下的cookie的时候，得到的字符串形式的值，它包含了当前网站下所有的cookie(为避免跨域脚本(xss)攻击，这个方法只能获取非 HttpOnly 类型的cookie)。它会把所有的cookie通过一个分号+空格的形式串联起来，例如username=chenfangxu; job=coding.
### 写操作
如果只设置一个值，那么算cookie中的value 设置的两个cookie,key值如果设置的相同，下面的也会把上面的覆盖。
### cookie的生命周期
- 如果我们想长时间存放一个cookie。需要在设置这个cookie的时候同时给他设置一个过期的时间。如果不设置，cookie默认是临时存储的，当浏览器关闭进程的时候自动销毁
注意：document.cookie = '名称=值;expires=' + GMT(格林威治时间)格式的日期型字符串;
```js
//一个设置cookie时效性的例子
function setCookie(c_name, value, expiredays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";
  expires="+exdate.toGMTString())
}
//使用方法：setCookie('username','cfangxu',30)
```
- >expires 是 http/1.0协议中的选项，在新的http/1.1协议中expires已经由 max-age 选项代替，两者的作用都是限制cookie 的有效时间。expires的值是一个时间点（cookie失效时刻= expires），而max-age 的值是一个以秒为单位时间段（cookie失效时刻= 创建时刻+ max-age）。
另外，max-age 的默认值是 -1(即有效期为 session )；max-age有三种可能值：负数、0、正数。
负数：有效期session；
0：删除cookie；
正数：有效期为创建时刻+ max-age
***cookie***在以前每个域名只能设置几个或几十个，字字千金，现在据说有5M,cookie必须使用服务器环境。






## FormData
>使用场景:
1.模拟表单控件
2.用来传输二进制文件
>能够把files[n]变成二进制的数据 => 机器的语言
```
image图片变成二进制，方便机器解析
let fd=new FormData;
有多少字段就追加多少个append,后面不会覆盖前面的
fd.append('image',file.files[0]);
fd.append('user','kkw')
image=asdawe&user=kkw
```
```js
  let fd = new FormData();
  xhr.upload.onprogress = function(ev){
    let scale = ev.loaded / ev.total;
    box.style.width = scale * 100 + '%';
  }
  fd.append('image',file.files[0]);
  xhr.send(fd);

```













## window.location.reload() 
- >在js中实现刷新页面的方法有很多种，在js中有一个location.reload()函数，它就可以实现我们想要的功能。
- >window.location.reload(true) //浏览器重新从服务器请求资源,在http请求头中不会包含缓存标记。
## 文件上传和下载事件  => 上传和下载的进度条的显示 
>xhr的进度事件分为上传xhr.upload.onprogress和下载的xhr.onprogress都会给事件监听函数传递一个实参event对象,event.loaded表示已经载入的数据,event.total表示总共数量,前提是event. lengthComputable优值得情况下才可以。 
```js
 //下载
  xhr.onprogress = progressHandle
 //上传
 xhr.upload.onprogress = progressHandle
 
 function progressHandle(e) {
     var e = e || event 
     if(e.lengthComputable) {
         return Math.round(e.loaded / e.total * 100)+'%'
     }
 }
 ```
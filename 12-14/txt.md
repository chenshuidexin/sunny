# 今天的课件全在13号里public中
## URLSearchParams
```
let obj=new URLSearchParams({
    user:'kkw',
    pw:'123',
    hobby:'swimming'
})
console.log(obj)//URLSearchParams {}
console.log(''+obj)//user=kkw&pw=123&hobby=swimming
```
## fetch代替ajax请求get传递方式
```
fetch的请求方式默认是get。
fetch("/get?user="+this.value)
     .then(d=>res.json())
     .then(d=>{
         console.log(d);
     })
```
## fetch代替ajax请求post传递方式
```
user.onblur=function(){
    fetch('/post',{
        method:'post',
        body:''+new URLSearchParams({
            user:this.value
            key:val,
            key2:val2
        }),//存放post请求的时候提交的数据如果value是中文会转化成URI编码
    ||  body:'key=val&key2=val2'
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        }
    }).then(d=>d.json()).then(d=>{
        console.log(d)
    })
}
```
## 请求和响应头部
>request和response的作用执行流程：
- Web服务器收到客户端的http请求，会针对每一次请求，分别创建一个用于代表请求的request对象、和代表响应的response对象。
- 故：当需要获取客户机提交过来的数据时，找request对象就行了。当需要向客户机输出数据，找response对象。
- >General：常规信息
```
1、Request URL:资源的请求地址
2、Request Method:HTTP方法请求的方式 GET POST HEAD DELETE PUT...
3、Status Code:响应状态码
4、Remote Address：当前页面的端口数字
5、Referrer Policy：在页面引入图片、JS等资源，或者从一个页面跳到另一个页面，都会产生新的HTTP请求，浏览器一般都会给这些请求头加上表示来源的Referrer字段。
        新的Referrer Policy规定了五种Referrer策略：No Referrer、No Referrer When Downgrade、Origin Only、Origin When Cross-origin、和Unsafe URL。
     --->   No Referrer：任何情况下都不发送Referrer信息
     --->   No Referrer When Downgrade：仅当发生协议降级（如HTTPS页面引入HTTP资源，从HTTPS页面跳到HTTP等）时不发送Referrer信息。这个规则是现在大部分浏览器默认所采用的
     --->   Origin Only：发送只包含host部分的Referrer。启用这个规则，无论是否发生协议降级，无论是本站链接还是站外链接，都会发送Referrer信息，但是只包含协议+ host部分（不包含具体的路径及参数等信息）
     --->  Origin When Cross-origin：仅在发生跨域访问时发送只包含host的Referrer，同域下还是完整的。它与Origin Only的区别是多判断了是否Cross-origin。需要注意的是协议、域名和端口都一致，才会被浏览器认为是同域
     --->  Unsafe URL：无论是否发生协议降级，无论是本站链接还是站外链接，统统都发送Referrer信息。正如其名，这是最宽松而最不安全的策略。
```
- >Response Headers(响应头) -> 服务器发给你的东西(接受到的)
- >Request Headers(请求头) -> 发给服务器的东西(发送出去的)
- >Query String Parmeters(请求体)
```
解决方案
1. application/x-www-form-urlencoded最常见的POST提交格式，使用这个编码格式post的数据会以键值对的方式提交。
2. multipart/form-data通常上传图片等文件会使用这种编码格式提交。
3. application/json提交JSON格式的数据。
4. text/plain窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符。
当action为get时候，浏览器用x-www-form-urlencoded的编码方式把form数据转换成一个字串（name1=value1&name2=value2...），然后把这个字串append到url后面，用?分割，加载这个新的url。
当action为post时候，浏览器把form数据封装到http body中，然后发送到server。如果没有type=file的控件，用默认的application/x-www-form-urlencoded就可以了。但是如果有type=file的话，就要用到multipart/form-data了。浏览器会把整个表单以控件为单位分割，并为每个部分加上Content-Disposition(form-data或者file),Content-Type(默认为text/plain),name(控件name)等信息，并加上分割符(boundary)。
```
### http状态码  1-6开头
- 1xx：临时响应，表示临时响应并要求请求者继续执行操作的状态码
```
100(continue 继续) ：请求者应当继续执行请求，此时，请求者已接收到一部分数据，正在等待剩下的数据。
101(switch protocols 切换协议)：请求者要求服务器切换协议，服务器接收请求并已准备切换
```
- 2xx：成功，成功的请求了数据
```
200(OK)：请求成功，此时，客户端已经成功地接收到了数据。
201(Created)：请求成功，并且服务器创建了新的资源
202(Accepted)：服务器已接受了请求。
203(Non-Authoritative Information) ：非授权信息， 服务器已成功处理了请求，但返回的信息可能来自另一来源。
204(No content)：服务器成功地接受了请求，但是并没有返回任何内容。
205(reset content)：服务器成功地接受了请求，但是并没有返回任何内容。
206(Partial Content)：服务器成功地接受了请求，并返回了部分内容。
```
- 3xx：重定向,表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向。
```
300(Multiple Choice)： 针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。
301(Moved Permanently)：永久重定向，请求的网页已永久移动到新位置。 服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。
302（Found）：临时移动，服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
304(Not Modified)：内容无修改。自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。
```
- 4xx：请求错误(客户端错误) ，这些状态代码表示请求可能出错，妨碍了服务器的处理。
```
400(Bad Request)：请求错误，服务器不理解请求的方式。
401(Unauthenticated)：未授权。请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
403(Forbidden)：禁止。服务器拒绝接受请求。
404(Not found)：未找到，服务器找不到请求的网页。
409(Confilict)：冲突。服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息。
```
- 5xx：服务器错误，这些状态代码表示服务器在尝试处理请求时发生内部错误。 这些错误可能是服务器本身的错误，而不是请求出错。
```
500(Internal Error)：内部错误。服务器内部发生错误。比如异常。
501(Not Implemented)：（尚未实施） 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。
502(Bad Gateway)：网关错误。服务器作为网关或代理，从上游服务器收到无效响应。
503(Service unavaliable)：服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。
504(Gateway timeout)： 服务器作为网关或代理，但是没有及时从上游服务器收到请求。
505(HTTP Version Not Supported)：HTTP 版本不受支持, 服务器不支持请求中所用的 HTTP 协议版本。
```
```
出现502的原因是：对用户访问请求的响应超时造成的
解决办法：如果是客户端，则可以不断刷新页面。
1.提高 Web 服务器的响应速度，也即减少内部的调用关系，可以把需要的页面、素材或数据，缓存在内存中，可以是专门的缓存服务器 ，也可以Web服务器自身的缓存，提高响应速度；
2.网络带宽的问题，则对传输的数据包进行压缩处理，或者向IDC申请增加带宽；
3.属于内部网络的故障或设置问题，也即内部网络拥塞，可能内部存在大量的数据调用或交互造成的，则需要优化内部网络传输或协议；
4.数据库的数据读取造成前端服务器 ，响应用户的请求变慢，那么必须提高数据库的处理能力，若是只读业务可以增加数据缓存的模式 或者增加数据库备机，分散读压力。
```
```
出现403的原因:
[403]是[HTTP协议]中的一个状态码(Status Code)。可以简单的理解为没有权限访问此站。该状态表示服务器理解了本次请求但是拒绝执行该任务，该请求不该重发给服务器。在[HTTP请求]的方法不是“HEAD”，并且服务器想让客户端知道为什么没有权限的情况下，服务器应该在返回的信息中描述拒绝的理由。在服务器不想提供任何反馈信息的情况下，服务器可以用[404]代替[403]
出现原因：
a、IP被列入黑名单；
b、在一定时间内过多地访问此网站（一般是用采集程序），被防火墙拒绝访问了；
c、网站[域名解析]到了空间，但空间未绑定此域名；
d、文件在[当前目录]下没有执行权限；
e、在不允许写/创建文件的目录中执行了创建/写文件操作；
f、服务器繁忙，同一IP地址发送请求过多，遭到服务器智能屏蔽。
```
## onreadystatechange事件
>当请求被发送到服务器时，我们需要执行一些基于响应的任务[可以监听发送请求的状态]。
- 每当 readyState 改变时，就会触发 onreadystatechange 事件。
- readyState 属性存有 XMLHttpRequest 的状态信息。
- >下面是 XMLHttpRequest 对象的三个重要的属性:
- >[nreadystatechange]存储函数(或函数名),每当readyState属性改变时,就会调用该函数.
- >[readyState]存有 XMLHttpRequest 的状态.从 0 到 4 发生变化.
```
0: 请求未初始化   ->  永远请求不到
1: 服务器连接已建立
2: 请求已接收
3: 请求处理中
4: 请求已完成，且响应已就绪
```
```
补充的说明：在低版本浏览器中1，2，3  ->  xhr.send()在user.onreadystatechange之后可以多监听到一次就是最后状态readyState ===> 4
高版本浏览器中xhr.send()位置如何变化，user.onreadystatechange的结果是2，3，4。但最好是放在user.onreadystatechange()之后方便监听到readyState的状态为4。
```
- >[status]状态码
```
常见的状态码
200: "OK"
404: 未找到页面
```
```js
user.onreadystatechange=function(){
  if (xhr.readyState==4 && xhr.status==200){
    idi.innerHTML=xhr.responseText;
    }
}
```
## eval
- eval函数的作用是在当前作用域中执行一段JavaScript代码字符串。
```js
eval('window.console.log("LBJ")');//LBJ
eval(window.console.log("LBJ"));//LBJ
window.console.log("LBJ");//LBJ
//三条语句输出的结果是一样的
```
- 间接和直接调用函数的时候会改变全局或局部作用域的值，带来不好的效果。
```js
//代码段1直接调用eval
var foo = 1;
function test() {
    var foo = 2;
    eval('foo = 3');
    return foo;
}

test(); // 3
foo; // 1

//代码段2间接调用eval
var foo = 1;
function test() {
    var foo = 2;
    var bar = eval; //这里将bar变量指向了eval函数的引用
    bar('foo = 3');
    return foo;
}
test(); // 2
foo; // 3
```
>在任何情况下我们都应该避免使用 eval 函数。99.9% 使用 eval 的场景都有不使用 eval 的解决方案.
- eval 也存在安全问题，因为它会执行任意传给它的代码， 在代码字符串未知或者是来自一个不信任的源时，绝对不要使用 eval 函数,容易造成xxs攻击。
```js
//安全解决部分问题方案
    btn.onclick = function(){
        let val = txt.value;
        if(/href|src|style|location/.test(val)){
            alert('早知道你想搞事情')
        }else{
            console.log(eval(`(${txt.value})`));
        }
        
    }
```

## JSON数据的两种解析方法 JSON.parse() 、eval ()方法
>JSON.parse() : 用于将一个 JSON 字符串转换为 JavaScript 对象。
```js
var str = '{"name":"zhangsan","age":18,"gender":"man"}';
​
var ass=JSON.parse(str);
console.log(ass);
```


结果：

注意：单引号写在{}外，每个属性名都必须用双引号，否则会抛出异常。(有的浏览器不支持 JSON.parse() 如：IE 6 、IE 7 就不支持)
2：eval(): 也是用于将一个 JSON 字符串转换为 JavaScript 对象
var str = '{"name":"zhangsan","age":18,"gender":"man"}';

eval('('+str+')'); // 格式： eval( '(' + string + ')' ); 

**结果**：

为什么eval()解析的时候要加括号？
那是因为eval()相当于一个执行环境，当你不加括号的时候，str 会被认为是一条复合语句。运行的时候就会逐个字符的解析。
但是加上括号的时候，str 就当做一个表达式去运算。从括号开始就被当做了对象进行识别。
```js
//JSON.parse() 和 eval()的区别
var num = 1;
var jsonstr = '{"name":"zhangsan","age":++num}';
var jsondata1 = eval('('+jsonstr+')');
​

console.log(jsondata1);

​
console.log(num);//这时num值为2
​
var jasondata2=JSON.parse(jsonstr);
console.log(jsondata2);//报错
```
```
结果：
从上例就可以明显地看出, eval在解析字符串时，会执行该字符串中的代码。 
由于用eval解析一个json字符串而造成原先的num的值改变(这样的后果是相当危险的)。
```
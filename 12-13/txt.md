### AJAX
-  Asynchronous（异步） Javascript（js） And（和） XML（标记语言,数据）
- 是一种前后台数据交互的技术(找后台拿数据的方式),[一种用于创建快速动态网页的技术，通过在后台与服务器进行少量数据交换，AJAX可以使网页实现异步更新。]
- 一种创建交互式网页应用的网页开发技术，也就是无需重新加载整个网页的情况下，能够更新部分网页的技术。
- 难点：如何操作数据(各种数据类型的应用)，异步，参数如何拼接(字段是什么？name=wk&age=10),如何开启服务器？
- ajax获取数据并不难，难的是拿到数据之后怎么操作?
```
请求数据的方式
$.ajax({})//引用的jq太多，性能降低，不可取
fetch('')
axios.get('')
wx.request('')
jsonp_fetch('')
拿到data数据
```
- XML -> JSON[效果类似] -> 字符串 '{}' || '[]'  ->  '{"name":"wwk"}' 
```
ajax的优点:
1.无刷新更新数据。
  AJAX最大优点就是能在不刷新整个页面的前提下与服务器通信维护数据。这使得Web应用程序更为迅捷地响应用户交互，并避免了在网络上发送那些没有改变的信息，减少用户等待时间，带来非常好的用户体验。
2.异步与服务器通信。
  AJAX使用异步方式与服务器通信，不需要打断用户的操作，具有更加迅速的响应能力。优化了Browser和Server之间的沟通，减少不必要的数据传输、时间及降低网络上数据流量。
3.前端和后端负载平衡。
  AJAX可以把以前一些服务器负担的工作转嫁到客户端，利用客户端闲置的能力来处理，减轻服务器和带宽的负担，节约空间和宽带租用成本。并且减轻服务器的负担，AJAX的原则是“按需取数据”，可以最大程度的减少冗余请求和响应对服务器造成的负担，提升站点性能。
4.基于标准被广泛支持。
  AJAX基于标准化的并被广泛支持的技术，不需要下载浏览器插件或者小程序，但需要客户允许JavaScript在浏览器上执行。随着Ajax的成熟，一些简化Ajax使用方法的程序库也相继问世。同样，也出现了另一种辅助程序设计的技术，为那些不支持JavaScript的用户提供替代功能。
5.界面与应用分离。
  Ajax使WEB中的界面与应用分离（也可以说是数据与呈现分离），有利于分工合作、减少非技术人员对页面的修改造成的WEB应用程序错误、提高效率、也更加适用于现在的发布系统。
```
```
ajax的缺点
1.ajax干掉了Back和加入收藏书签功能，即对浏览器机制的破环。
  在动态更新页面的情况下，用户无法回到前一个页面状态，这是浏览器仅能记下历史记录中的静态页面。一个被完整读入的页面与一个已经被动态修改过的页面之间的可能差别非常微妙；用户通常都希望单击后退按钮，就能够取消他们的前一次操作，但是在ajax应用程序中，却无法这样做。
2.ajax的安全问题
   ajax技术给用户带来很好的用户体验的同时也对IT企业带来了新的安全威胁，ajax技术就如同对企业数据建立了一个直接通道。这使得开发者在不经意间会暴露比以前更多的数据和服务器逻辑。ajax的逻辑可以对客户端的安全扫描技术隐藏起来，允许黑客从远端服务器上建立新的攻击。还有ajax也难以避免一些已知的安全弱点，诸如跨站点脚步攻击，SQL注入攻击和基于Credentials的安全漏洞等等。
3.因为网络延迟需要给用户提供必要的提示
   进行ajax开发的时候，网络延迟——即用户发出强求到服务器发出响应之间的间隔——需要慎重考虑。如果不给予用户明确的回复，没有恰当的预读数据，或者对XMLHttpRequest的不恰当处理，都会使用户感到厌烦。通常的解决方案是:使用一个可视化的组件来告诉用户系统正在进行后台操作并且正在读取数据和内容。
```
## 如何启动服务器?
- 1.点击服务器文件[文件不能是中文名]
- 2.看看有没有安装node_modules文件，没有的话就安装依赖环境。
   - 第一种方式:shift+鼠标右键  选择在此处打开终端
   - 第二种方式:把服务器文件拖到vscode中，点击终端
   - npm install  =>  安装依赖
- 3.运行服务器
   - 输入npm run start || 输入node app 按着Tab键补全命令(自动补齐)
>注意的是:***浏览器要输入localhost/xx.html(打开方式)，千万不要双击直接运行文件(不要在本地打开，要使用localhost的方式打开)
- 4.代码要放在相应的文件夹下。
## XMLHttpRequest
>Ajax是有机利用了一系列相关的技术。虽然其名称包含XML。但实际数据格式可以有json代替，进一步减少数据量，形成所谓的Ajax。为了使用JavaScript向服务器发出HTTP请求，需要一个提供此功能的类的实例，这就是XMLHttpRequest的由来。
```
需要掌握XMLHttpRequest的属性和方法
console.log(XMLHttpRequest)
在控制台上查找
```
```
action:请求的地址
method：请求的方式(get,post...)
name="user",name="pw" => 字段 -> user=kkw&pw=18
```
>操作的课件在C盘桌面文件夹pp上.
- >AJAX通过原生的XMLHttpRequest对象发出HTTP请求，得到服务器返回的数据后，再进行处理。现在，服务器返回的都是JSON格式的数据，XML格式已经过时了，但是AJAX这个名字已经成了一个通用名词，字面含义已经消失了。
- >XMLHttpRequest对象是AJAX的主要接口，用于浏览器与服务器之间的通信。尽管名字里面有XML和Http，它实际上可以使用多种协议（比如file或ftp），发送任何格式的数据（包括字符串和二进制）。
- >注意的是:AJAX只能向同源网址（协议、域名、端口都相同）发出HTTP请求，如果发出跨域请求，就会报错。
### ajax请求交互模式
- 1.创建一个电话
- 2.输入号码
- 3.拨打发送
- 4.等待回应
- 5.在通话...
```
小黄人的应用 ---> xhr
----> 创建new一个XMLHttpRequest对象
var xhr=new XMLHttpRequest;
----> 填写请求方式、请求地址、是否异步(默认为异步true)
xhr.open('get','/get?user='+this.value,true);
----> 发送请求
xhr.send();
----> 监听数据响应
xhr.onload=function(){
----> 接收到数据并可以进行操作
    console.log(xhr.responseText)
    //这是json，本质是字符串，转换成对象需要JSON.parse(xhr.responseText)
    //对象易于操作。
}
```
## get和post之间的爱恨情仇==>  **三次握手事件**
#### get
```
var xhr = new XMLHttpRequest;
xhr.open('get','/get?user='+this.value,true);
xhr.send();
xhr.onload = function(){
    console.log(xhr.responseText);
}
```
```
GET是通过url进行请求(4步进行发送请求)
 http://www.baidu.com:99/get?user=kkw#aa=12
 协议      域口      端口接口 查询信息 hash信息
 GET的优势就是快  ==>  用于展示类的
   相对不安全(在请求的时候会显示在地址栏或者历史记录里面查到)
   请求体积是有限的(根据浏览器的标准进行限制) 传不了大的东西
   在低版本IE下有缓存问题
     第一次和第二次请求的url是一致的那么就会走第一次的缓存
     解决方案：
     第一种方式:不用get用post方式请求
     第二种方式：每次url不一致。
     ```
        /get?user=liucheng&random=3213321321
        /get?user=liucheng&random=3213325748
     ```
   输入的内容是中文的时候，在IE下会出现错误请求和返回是因为IE的低版本在解析中文的时候会出现问题
    解决方案
     把中文转成URI编码
       encodeURI('下')->%..%..%..
       encodeURIComponent('下')
    URI编码转成中文
      decodeURI('%..%..%..')->'下'
      decodeURIComponent('%..%..%..')
```
#### post
```
var xhr = new XMLHttpRequest;
xhr.open('post','/post',true);
xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
xhr.send('user='+this.value);
xhr.onload = function(){
    console.log(xhr.responseText);
}
```
```
post是通过服务器来发送请求的(跟用户相关的信息，发送体积比较大的文件)[至少六部才能成功发送请求]
相对安全,因为是通过服务器来发送请求的
理论上体积可以是无限大(但是后台人员一般都会给予限制)
比get要慢
必须添加请求头
xhr.setRequestHearder('content-type','application/x-www-form-urlencoded')
```
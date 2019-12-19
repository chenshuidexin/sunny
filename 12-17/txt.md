## onstorage事件
>兄弟页面进行触发：同一个浏览器、同一个域名、不同的tab
>>>>cookie 前端用基本上就是为了本地缓存，后端用是为了下次操作的时候把记录发送给后端
## localStorage
>专门为前端准备的本地存储
- 生命周期:(跟域名而走)  =>  只要不删除，就永远留着  =>  据说有体积是5M,而且未来还会增加
```
增：
localStorage.setItem(key,val)
删：
localStorage.removeItem(key)
查：
localStorage.getItem(key)
清除：
localStorage.clear()
不能用解构赋值
```
## sessionStorage
- 都是本地存储
- 默认生命周期就是关闭浏览器就会死亡
- setItem  getItem  removeItem  clear
- 不同点：
- 不能设置生命周期
- 不能使用onstroage事件
## BOM
>浏览器对象模型  =>  基本不兼容

- >window.innerHeight     浏览器的高度
- >window.pageYOffset     滚动条的距离只能读不能写
- >window.scrollTop(x,y)  设置滚动条的距离
- >window.location.href="" 一打开页面就跳转到别的页面
```
console.log(window.location)
host         ->  host
hostname     ->  当前host的名字
href         ->  url链接
origin       ->  源
pathname     ->  路径名字(一般是接口)
protocol     ->  协议
port         ->  端口
reload       ->  刷新页面
hash         ->  锚信息，hash值  #之后的(包括#)修改不会刷新页面
ajax最大的缺陷就是丧失浏览器历史记录==>所谓的不安全
当hash值变化的时候，会触发一个onhashchange事件
search       ->  查询信息  ?号到#之间的信息 修改它是会刷新页面的
不管是改变hash还是改变search都会使浏览器记录用户操作(就可以使用返回键和前进键)
当切换路由的时候会从后端的静态资源中查找需要传资料到前台，后端跳路由会刷新页面这样会影响用户体现，所以使用hash来充当跳路由器的动作来请求资源，这样一来第一能够成功请求资源，第二不刷新页面。
```
- window.navigator.userAgent   用户的内核信息(字符串) => 注意的是容易被模拟




## hash和history之间的小暧昧
>从用户角度看 前端路由实现了两个功能（使用ajax更新页面状态的情况下）
```
1、记录当前页面的状态（保存或分享当前页的url，再次打开该url时，网页还是保存的（分享）时的状态）；
2、可是使用浏览器的前进后退功能（如点击后退按钮，可以使页面回到ajax更新页面之前的状态，url也回到之前的状态）
```
>作为开发者，要实现这两个功能，我们需要做到：
```
1、改变url且不让浏览器向服务器发出请求；
2、监测url的变化；
3、截获url地址，并解析出需要的信息来匹配路由规则。
```
>我们路由常用的hash模式和history模式实际上就是实现了上面的功能。
```
1、hash模式
这里的hash就是指url尾巴后的#号以及后面的字符。这里的#和css里的#是一个意思。hash也称作锚点，本身是用来做页面定位的，他可以使对应的id元素显示在可视区域内。
由于hash值变化不会导致浏览器向服务器发出请求，而且hash改变会触发hashchange事件，浏览器的进后退也能对其进行控制，所以人们在html5的history出现前，基本都是使用hash来实现前端路由的。他的特点在于：hash虽然出现url中，但不会被包含在HTTP请求中，对后端完全没有影响，因此改变hash不会重新加载页面。hash 本来是拿来做页面定位的，如果拿来做路由的话，原来的锚点功能就不能用了。其次，hash的而传参是基于url的，如果要传递复杂的数据，会有体积的限制.
使用到api：
  window.location.hash='qq'//设置 url 的 hash，会在当前url后加上'#qq'

var hash = window.location.hash //'#qq'

window.addEventListener('hashchange',function(){
  //监听hash变化，点击浏览器的前进后退会触发
})
```
```
2、history模式
history模式不仅可以在url里放参数，还可以将数据存放在一个特定的对象中。
history———利用了HTML5 History Interface 中新增的pushState（）和replaceState（）方法。（需要特定浏览器的支持）history不能运用与IE8一下
相关API：
window.history.pushState(state,title,url)
//state：需要保存的数据，这个数据在触发popstate事件时，可以在event.state里获取
//title：标题，基本没用，一般传null
//url：设定新的历史纪录的url。新的url与当前url的origin必须是一样的，否则会抛出错误。url可以时绝对路径，也可以是相对路径。
//如 当前url是 https://www.baidu.com/a/,执行history.pushState(null, null, './qq/')，则变成 https://www.baidu.com/a/qq/，
//执行history.pushState(null, null, '/qq/')，则变成 https://www.baidu.com/qq/

window.history.replaceState(state,title,url)
//与pushState 基本相同，但她是修改当前历史纪录且不刷新页面，而 pushState 是创建新的历史纪录

window.addEventListener("pospstate",function(){
 //监听浏览器前进后退事件，pushState与replaceState方法不会触发
})
window.history.back()//后退
window.history.forward()//前进
window.history.go(1)//前进一步，-2回退两步
pushState 记录url状态的
replaceState 替换记录
window.history.lengthk可以查看当前历史堆栈中页面的数量
```
```
这两个方法应用于浏览器的历史纪录站，在当前已有的back、forward、go 的基础之上，他们提供了对历史纪录进行修改的功能，只是当他们执行修改使，虽然改变了当前的url，但你的浏览器不会立即像后端发送请求。
404错误
1、hash模式s下，仅hash符号之前的内容会被包含在请求中，如 http://www.abc.com 因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回404错误；
2、history模式下，前端的url必须和实际后端(服务端)发起请求的url一致，如http://www.abc.com/book/id 。如果后端缺少对/book/id 的路由处理，将返回404错误。==>伪造的url如果没有服务端配合，那么是不能刷新页面，不然一刷新又找服务器，最后会报404.
```


## 服务器时间
>使用服务器时间安全可靠，使用本地时间可以让人随意改变

>如果在使用服务器时间的时候，发现设置的时间是1970，直接在后面*1000，因为服务器时间是按照秒计算的。

## 冒泡事件的应用
>在一个对象上触发某类事件（比如单击onclick事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，如果没有定义此事件处理程序或者事件返回true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）。
打个比方说：你在地方法院要上诉一件案子，如果地方没有处理此类案件的法院，地方相关部门会帮你继续往上级法院上诉，比如从市级到省级，直至到中央法院，最终使你的案件得以处理。
```
冒泡事件的作用：
（1）事件冒泡允许多个操作被集中处理（把事件处理器添加到一个父级元素上，避免把事件处理器添加到多个子级元素上），它还可以让你在对象层的不同级别捕获事件。
（2）让不同的对象同时捕获同一事件，并调用自己的专属处理程序做自己的事情，就像老板一下命令，各自员工做自己岗位上的工作去了。
```
#### 冒泡事件的注意事项
- 事件捕获其实有三种方式，事件冒泡只是其中的一种：（1）IE从里到外（inside→outside）的冒泡型事件。（2）Netscape4.0从外到里（outside→inside）的捕获型事件。（3）DOM事件流，先从外到里，再从里到外回到原点（outside→inside→outside）的事件捕获方法
- 不是所有的事件都能冒泡。以下事件接受冒泡但是不处理：blur、focus、load、unload。- ●事件捕获方式在不同浏览器，甚至同种浏览器的不同版本中是有所区别的。如Netscape4.0采用捕获型事件解决方案，其它多数浏览器则支持冒泡型事件解决方案，另外DOM事件流还支持文本节点事件冒泡。即事件捕获到达顶层的目标在不同浏览器或不同浏览器版本也是有区别的。在IE6中HTML是接收事件冒泡的，另外大部分浏览器将冒泡延续到window对象，即……body→documen→window。
- 阻止冒泡并不能阻止对象默认行为。比如submit按钮被点击后会提交表单数据，这种行为无须我们写程序定制。
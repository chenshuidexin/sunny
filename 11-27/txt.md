## 单线程
>JS按理来说是从上往下解读代码，同一时间只能做一件事，它是单线程的
- >JS的设计就是为了处理浏览器网页的交互（DOM操作的处理、UI动画等），决定了它是一门单线程语言。
## 多线程
>为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。(同一时间可以做多种事情) 
- 事件调用 -> 把任务交给了引擎(所有的js事件全部都是异步的)
- >JavaScript单线程指的是浏览器中负责解释和执行 JavaScript 代码的只有一个线程，即为 JS引擎线程，但是浏览器的渲染进程是提供多个线程的，如下：
    - JS引擎线程
    - 事件触发线程
    - 定时触发器线程
    - 异步http请求线程
    - GUI渲染线程
>当遇到计时器、DOM事件监听或者是网络请求的任务时，JS引擎会将它们直接交给 webapi，也就是浏览器提供的相应线程（如定时器线程为setTimeout计时、异步http请求线程处理网络请求）去处理，而JS引擎线程继续后面的其他任务，这样便实现了 异步非阻塞。定时器触发线程也只是为 setTimeout(..., 1000) 定时而已，时间一到，还会把它对应的回调函数(callback)交给 消息队列 去维护，JS引擎线程会在适当的时候去消息队列取出消息并执行。
这里，JavaScript 通过 事件循环 event loop 的机制来解决这个问题
## 同步
> 代码从上往下依次执行，如果一个地方卡住了下面的代码就会不执行了
## 异步
>代码虽然从上往下依次执行，如果一个地方卡住了不会阻止下面的代码的执行
- 定时器、所有的事件、promise都是异步
>总结：js先执行主线程代码，如果主线程有异步代码，比如定时器，promise或者事件那么会把异步代码放到异步队列中存储，当异步代码的条件成立的时候，把异步代码压入到主线程中执行，压入的方式是如果有微任务就先执行微任务，执行完微任务在执行宏任务。当进入主线程空间的时候执行压入的代码，执行完之后再从异步队列中压入异步代码到主线程中，这个过程叫事件循环。
- >注意的是执行完微任务是第一层的，如果在宏任务中开个微任务，那么先执行宏任务在执行宏任务中的微任务。
- >异步操作是不容易进行维护开发的，同步操作才利于维护开发(上面的代码执行完才会执行下面的，有序进行)
- >promise是解决异步编程顺序问题的(让异步的代码同步执行)
## 事件循坏和消息队列
- >回到事件循环 event loop
- >其实 事件循环 机制和 消息队列 的维护是由事件触发线程控制的。
- >事件触发线程 同样是浏览器渲染引擎提供的，它会维护一个 消息队列。
- >JS引擎线程遇到异步（DOM事件监听、网络请求、setTimeout计时器等…），会交给相应的线程单独去维护异步任务，等待某个时机（计时器结束、网络请求成功、用户点击DOM），然后由 事件触发线程 将异步对应的 回调函数 加入到消息队列中，消息队列中的回调函数等待被执行。
- >同时，JS引擎线程会维护一个 执行栈，同步代码会依次加入执行栈然后执行，结束会退出执行栈。
- >如果执行栈里的任务执行完成，即执行栈为空的时候（即JS引擎线程空闲），事件触发线程才会从消息队列取出一个任务（即异步的回调函数）放入执行栈中执行。
- >消息队列是类似队列的数据结构，遵循先入先出(FIFO)的规则。
- >执行完了后，执行栈再次为空，事件触发线程会重复上一步操作，再取出一个消息队列中的任务，这种机制就被称为事件循环（event loop）机制。
>事件循环机制：
- JS引擎线程会维护一个执行栈，同步代码会依次加入到执行栈中依次执行并出栈。
- JS引擎线程遇到异步函数，会将异步函数交给相应的Webapi，而继续执行后面的任务。
- Webapi会在条件满足的时候，将异步对应的回调加入到消息队列中，等待执行。
- 执行栈为空时，JS引擎线程会去取消息队列中的回调函数（如果有的话），并加入到执行栈中执行。
- 完成后出栈，执行栈再次为空，重复上面的操作，这就是事件循环(event loop)机制。
## 宏任务和微任务
- 执行机制
>- 执行一个宏任务（栈中没有就从事件队列中获取）
>- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
>- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
>- 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
>- 渲染完毕后，JS引擎线程继续，开始下一个宏任务（从宏任务队列中获取）
## promise
- >promise解决了异步编程问题，在then里面就走同步
- >Promise对象有以下两个特点。
   - >（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
   - >（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
   - >注意，为了行文方便，本章后面的resolved统一只指fulfilled状态，不包含rejected状态。
   ## 优点和缺点
   - >有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。
   - >Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
   - >如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署Promise更好的选择。
- >如何使用promise?
```js
new Promise(function(resolve,reject){
    //主线程代码
    //当异步代码执行完，通过异步代码的结果去调用resolve或者reject
    //异步代码有可能报错或者错误，如果报错或者错误就会执行reject
    //一般是resolve(放异步的结果)
});
//它有一个返回值，返回值是promise对象，这个对象有then方法
//then(resolve,reject)==》(成功函数，失败函数)
//第一个then(微任务)==> 成功函数里面的参数就是异步的结果
//第二个then(微任务)==> 第一个then的返回值
``` 
## resolve和reject
- >Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
- >resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
- >Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
- >promise.then(function(value){},function(error){});
- >then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。
```js
let p = new Promise(function(resolve,reject){
    resolve(5);//成功函数给下一个then函数传参
});
    p.then(function(data){//形参赋值
        console.log(data);//5
    })
```
- >虽然promise解决了异步编程问题，但是在then的外面还是异步进行。没有promise也能进行开发，只不过维护起来麻烦些,利用回调函数进行解决。
```js
//回调函数
let a=10;
function fn(cb){
    setTimeout(()=>{
        a=20;
        cb(b);
    },3000)
}
fn(function(a){
    console.log(a);
})
```
- >then中包含两个函数，第一个函数是成功之后的回调函数，第二个函数是失败之后的回调函数。
- >finally:不管成功还是失败都会进回调函数
- >如果代码有可能会报错，下面的代码是不会执行的，如果使用try,catch那么try中的代码报错会进入catch，报错之后不会影响后面代码执行的。
```js
function fn(){
try{//正常
b;
console.log(b)
}catch(r){//报错
console.log(r)//出现异常的原因
setTimeout(()=>{
    b=22;
    fn();
},2000)
}}//一开始b是报错的走catch里的代码，重新赋值给b并且再次调用fn,此时的b是22，走try里的代码。
```
```js
new Promise((s,j)=>j()).then(()=>{
    console.log(1)
},()=>{
    console.log(2)
}).catch(()=>{
    console.log(3)
})
//结果是2，成功s没有回调函数走失败j的回调函数
```
```js
//手写请求数据
//在课件4中
```
## JSON
- JSON -> 数据结构，长得像对象和数组的字符串，本质是字符串。
```js
'[]' JSON -> []//数组
'{}' JSON -> {}//对象
```
- JSON 取值是不方便的，可以使用JSON.parse()方法把JSON转成对象
- parse必须为标准的JSON格式才能成功转化
```js
'[]'  ->  []
```
- >'{"name":"kaibao"}'
- 对象转JSON是使用JSON.stringify()的副作用是函数和undefined会被过滤掉。
- JSON.stringify({对象}，function(){})//传参
```js
let f=JSON.stringify({name:"凯宝",age=3},function(key,val){
    if(key === "age"){
        val=val<10?'0'+val:''+val
    }
    return val
})
console.log(f)
```
```js
[]  ->  '[]'
```
## promise.all()的用法
- >Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）
- >p的状态由p1、p2、p3决定，分成两种情况。
  - >（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
  - >（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
```js
const promises=[2,3,5,7,11,13].map(function(id){returngetJSON('/post/'+id+".json");});Promise.all(promises).then(function(posts){}).catch(function(reason){});
```
上面代码中，promises是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成fulfilled，或者其中有一个变为rejected，才会调用Promise.all方法后面的回调函数。
```js
//在课件5中
```
## promise.race()的用法
- >只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
```js
//在课件6中
```
## 区别
- throw  new  Error ('error!!!') 抛出异常，说明代码错误，会进catch;如果是return new  Error ('error!!!')不会进catch进then
- .then和.catch返回值不能是promise本身，否则会造成死循环
```js
const promise=Promise.reslove()
.then(()=>{
    return promise
})
promise.catch(console.error)
```
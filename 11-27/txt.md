## 单线程
>JS按理来说是从上往下解读代码，同一时间只能做一件事，它是单线程的
## 多线程
>为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。(同一时间可以做多种事情) 
- 事件调用 -> 把任务交给了引擎(所有的js事件全部都是异步的)
## 同步
> 代码从上往下依次执行，如果一个地方卡住了下面的代码就会不执行了
## 异步
>代码虽然从上往下依次执行，如果一个地方卡住了不会阻止下面的代码的执行
- 定时器、所有的事件、promise都是异步
>总结：js先执行主线程代码，如果主线程有异步代码，比如定时器，promise或者事件那么会把异步代码放到异步队列中存储，当异步代码的条件成立的时候，把异步代码压入到主线程中执行，压入的方式是如果有微任务就先执行微任务，执行完微任务在执行宏任务。当进入主线程空间的时候执行压入的代码，执行完之后再从异步队列中压入异步代码到主线程中，这个过程叫事件循环。
- >注意的是执行完微任务是第一层的，如果在宏任务中开个微任务，那么先执行宏任务在执行宏任务中的微任务。
- >异步操作是不容易进行维护开发的，同步操作才利于维护开发(上面的代码执行完才会执行下面的，有序进行)
- >promise是解决异步编程顺序问题的(让异步的代码同步执行)
## promise
- >promise解决了异步编程问题，在then里面就走同步
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
```js
let p = new Promise(function(resolve,reject){
    resolve(5);//成功函数传参
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
try{//正常
}catch(r){//报错
}
```
```js
//手写请求数据
//在课件4中
```
## JSON
- JSON -> 长得像对象和数组的字符串，本质是字符串。
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
```js
[]  ->  '[]'
```
## promise.all()的用法
```js
//在课件5中
```
## promise.race()的用法
```js
//在课件6中
```
## 区别
- throw 抛出异常，说明代码错误，会进catch，如果是return new  Error ('error!!!')不会进catch进then
- .then和.catch返回值不能是promise本身，否则会造成死循环
```js
const promise=Promise.reslove()
.then(()=>{
    return promise
})
promise.catch(console.error)
```
## 变量提升
>js引擎会一开始就会解析全局作用域中的所有var和function的变量，，会通过函数覆盖undefined，后面覆盖前面的原则进行变量值最后的确认。
>逐行解读代码=====读打印、输出、赋值(=);解析过的不在解读。
## 作用域
>- JS执行的环境(范围)
>- 预解析：看var和函数
### 函数
- 形参赋值
- 变量提升
- 执行上下文
- 执行只能销毁
# 
## 全局作用域(window执行栈)
    + 如果有多个script标签，上一个script标签报错是不会影响下面script标签中代码执行的
    + 查找的方式：先看当前的script标签有没有。没有会找上一个script标签中查找，如果确实找不到，那就报错。
## 局部作用域(函数中的执行栈)
>当函数执行的时候，开辟了一个执行栈，把函数中存的字符串运行在这个执行栈中
- 1.形参赋值
- 2.变量提升
- 3.执行上下文
- 4.执行只能销毁
  - 如果局部作用域中没有和函var，函数、形参的时候，就会查找函数外面的变量，直到window为止。
  - 如果局部作用域中只有var，会直接在函数体内找这个变量，不会是window全局的变量。
  - 如果局部作用域中有形参、var，那么形参最大。
  - 如果局部作用域中有形参、var、函数，那么函数体内的函数最大。
### 块级作用域
# 
## this
- 1.事件触发是谁，this就是谁
```js
btn.onclick=function(){
    console.log(this);//btn
}
```
- 2.window全局打印this 函数名fn()调用this[看[]前面的.是否有主]；
```js
function fn(){alert(this)}  fn()//window
console.log(this)//window
//匿名函数自执行
(function (){alert(this)})()//window
```
- 3.对象下的this就是.前面的主。
```js
obj={
    style:{
        fn:function(){
            alert(this);
        }
    }
}
obj.style.fn()//主是obj.style
//另一种区分
var f=obj.style.fn()
f//window
```
- 4.箭头函数



# 
## 闭包
>- 作用：是为了存储变量或是参数。
>- 1.函数嵌套着函数
>- 2.子函数引用父函数的参数或变量
>- 3.子函数被外界所引用
>- 4.父级就形成了闭包环境，父级的参数或是变量被浏览器垃圾机制给强制回收
>- 5.打印父级的函数返回值，会出现scopes下有个closure
```js
function fn(){
    var a=10;
    function f(){
        console.log(a)
    }
    return f;
}
let ff=fn();//fn就成了闭包环境
//fn中的参数或是变量被浏览器垃圾机制给强制回收
console.dir(ff)//scopes下里面有closure(闭包)
```
```js
//匿名自执行函数 不是闭包
(function(){})()

```








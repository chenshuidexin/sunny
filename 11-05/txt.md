## 复习
- 封闭空间不是闭包，而闭包有封闭空间的功能
- 面向对象的特征:封装(归类的过程)、继承、多态
- 面向过程:思考如何把它实现////面向对象:选择谁做这件事
- prototype下的方法或属性只能通过两种方式去获取
    - 1.直接使用
    - 2.给自己的实例化对象使用
- 如果某个原型下没有想要的属性或者方法，那么还会通过这个原型下的原型链继续查找，直到找到Object.prototype为止，因为Object.prototype.__proto__为null。
- 内置类：浏览器自带的类
    - 所有的类型都是构造函数构造出来的 
    - null和undefined不会给人看到的
```js
//在课件1
```
## Function
- fn.__proto__==Function.prototype
- Function.prototype===Function.__proto__
## 函数的三个角色
>function(){}
- 函数:能够调用的角色
- 构造函数： new  构造对象的 
    - fn.prototype===公共的属性和方法都挂在这个构造函数的原型上。
```js
new Array().push();
new Array().forEach();
[].push
```
- Function的实例：new Function -> function (){}
  >__proto__
```js
//考题在课件3，4，5中
```
>在函数的原型下有一个属性(constructor),这个属性指向构造函数，但是当前的constructor并不是100%准确的，他的指针仅仅只是一个指向构造函数的方向(一个参考)，非常容易被修改。
>注意的是在对象赋值给构造函数原型的时候，constructor 指向会被修改的指向是Object，所以手动修正constructor指向。
```js
function Fn(){}
Fn.prototype={}//赋值一个对象
console.log(Fn.prototype.constructor)//ƒ Object()
```
## hasOwnProperty
>查看某个属性是不是对象自身的(面向对象)即查看某个属性是公有的还是私有的======返回一个布尔值==是本身就返回true否则为false
>- obj.hasOwnProperty('xx')
>- for in 的时候会把自定义的属性或方法枚举出来
```js
//在for in的过程中，如果不能确定构造函数的原型下是否有自定义属性，那么建议加上if判断，判断枚举的属性都是自身的。
Object.prototype.aa='qqq';//公有属性
let obj={//私有属性
    dd:'ss';
    mm:'cc'
}
for(let attr in obj){
    if(obj.hasOwnProperty(attr)){//私有属性会通过条件
        console.log(attr);
    }
}
console.log(obj.hasOwnProperty('dd'))//true
console.log(obj.hasOwnProperty('name'))//false
```
## hasPubProperty 
>检测某个属性是共有属性
```js
Object.prototype.aa='qqq';//公有属性
let obj={//私有属性
    dd:'ss';
    mm:'cc'
}
function hasPubProperty(obj,attr){
    return !obj.hasOwnProperty(attr)
}
```
## 基于内置类扩展方法
- Array.prototype.mypush()===push
```js
//手写mypush
let ary = [1,2,3]
Array.prototype.mypush=function(...arr){
    let naa=this.concat(arr);
    let len=naa.length;
    for(var i=0;i<len;i++){
        this[i]=naa[i]
    }
    return len
}
console.log(ary.mypush(4,5,6))
console.log(ary);
console.log(ary.concat([4,5,6])===ary)//false
```
## 链式调用
>链接同一种数组
```js
//在课件2
```
## this的用法
- 1.window
   - 在全局打印this
   - 函数调用
   - 定时器
   - 匿名自执行函数
- 2.点击事件
  - 只要是事件函数内的this都指向事件触发的元素
- 3.点前面的主
- 4.实例
  - 构造函数的下的this是实例，构造函数原型的this也是实例(前提是实例调用)
- 5.箭头函数
   - 指向的声明箭头函数的上下文的this。
   - 没有arguments，不能使用new。
```js
document.onclick=function(){
    console.log(this);//document
    return function (){
        console.log(this)//#document
    }
}

document.onclick=function(){
    setTimeout(function(){
        console.log(this)//window
    },1000)
}
//***************************
document.onclick=function(){
    setTimeout(new fn,1000)
    function fn(){
        console.log(this);
    }
}

document.onclick=function(){
    setTimeout(()=>{
        console.log(this)//#document
    },1000)
}
```
### call apply  bind
>当一个函数创建的时候，天生自带的方法，其中就有这些call、apply、bind方法
- >都是改变this指向的方法
- call[若干个参数]
>- 第一个参数：修改this的指向
>- 第二个参数:函数的实参
- apply[两个参数]
>- 第一个参数：修改this的指向
>- 第二个参数：数组里放的是实参
- bind()[多个参数]
>- 第一个参数：修改this的指向
>- 第二个参数：数组里放的是实参
>- 懒惰函数，柯里化函数，高阶函数
>- fn.bind(document,1,2)()===fn.bind(document)(1,2)
>- 返回值为新函数，只有调用返回的函数才会执行函数内的代码
**修改this的时候，不要传null和undefined，因为浏览器不认，传了还是默认原有的**
```js
function  fn(a,b){
    console.log(this,a,b)
}
fn.call(document,1,2);//函数传参
fn.apply(document,[1,2])//数组传参
fn.bind(document,1,2)()//函数调用
//另一种方法
fn.bind(document)(1,2)
console.dir(fn)
```
## var\let\const的区别
- var:当通过var创建一个变量的时候会进行预解析(变量提升)
   - 因为var会预解析，所以变量会当作属性存值到全局的活动变量对象(window)下
   - 不支持块级作用域
   - 不会主动把值存储起来
   - 允许重复声明变量
- let:当通过let创建一个变量的时候不会进行预解析(不会变量提升，不会在window下挂属性)
   - 在定义之前访问之前访问这个变量，之前的访问空间叫暂存死区。
   - 支持块级作用域
   - 会把每次循环的值给存储起来
   - 不允许重复声明变量、函数、参数
- const:常量(不可变的量)
   -  当声明一个变量，不允许改变的时候就使用const声明
   - 不允许重复声明变量、函数、参数(语言更加规范严谨)
   >const赋值的数据，它只会监控这个数据的地址
```js
//const下能够改变的值
const obj={
    b:0;
}
obj.b=122;
console.log(obj.b)//改变obj下对象的数值。
```
## 块{}====>封闭空间
> 在块套块中，子块有函数，如果在父块或父块的上方访问这个函数，那么都是undefined
> 如果在子块的下方访问这个函数，就能找到这个函数。
```js
{let a=22;
var b=55;}
console.log(a,b)
{function fn(){
    console.log(fn)
}}function fn(){}
```
```js
{
    console.log(fn);//undefined
    {function fn(){}}
    console.log(fn);//fn的函数
}
//浏览器标记清除法(浏览器回收机制)
```
# 

## 面向对象
- 单例模式
>单例：单独的实例====实例：构造函数的实例(对象)，描述具体的一个事务。====构造函数：抽象一个类的封装过程。
>- 原始值：数字，布尔，字符串。。。
>- 引用值:原始值和引用值的集合。
>- 高级单例模式:选择性对象的信息供给外界所查询和浏览[让当前这个实例功能更加强大，还可以隐藏和暴露细节信息更加安全|解决命名冲突问题|高级单例模式的写法：匿名函数自执行(return返回所暴露的信息)]
```js
//对象(单独的实例)
let obj={
    name:'易烊千玺'
    age=20
    hobbey:'singing'
}
//高级单例模式
```
## 解决命名冲突问题
- 封闭空间(把变量或者函数放到函数中)
```js
let a=11;
(function (){
    let a=22;
})()
```
- 命名空间
```js
let obj={name:22}
let obb={name:11}
//对象下的属性名相同并不相等。
```
## 工厂模式
>- 为了批量生产实例
>- 函数：目的是为了复用。
```js
function fn(name,age){
    // let obb={
    //     name:name,//name
    //     age:age,//age
    // }
    let obb={};
    obb.name=name;
    obb.age=age;
    return obb;
}
let ss=fn('aaa',111)//重复调用
console.log(ss)
```
## 面向对象(Object Oriented,OO)
- 面向对象是是一种对现实世界的理解和抽象的方法，一个计算机编程技术发展到一定阶段后的产物。
- >抽象：抽出像的部分(把相同的代码都抽离出来)
- >类(class):通过对象来编程，扩展性会更强，能够做到高内聚、低耦合。(用此方法的原因)
- >构造函数(类):构造对象的函数====归类====首字母要大写
- >*******************************************************************************************
- 面向对象：
  - >将具有相同特征的代码，抽离出来归为一类，然后把这个类的细节特性(属性、方法)挂在这个类的原型下的一种编程方式。
  - >JS是一个基于面向对象构造出来的语言
## new:ES6新运算符
>- new是函数的一元运算符,专门运算函数的。***new fn;***
>- 使用new之后会调用函数，就算不加()也会调用执行。
>- 使用new之后，函数默认返回值为实例化对象，不会是undefined。
>- 如果return后面的值为简单数据类型，结果为实例化对象(fn{})；若return后面的值为引用数据类型，结果为引用类型。
>- 使用new之后，this指向实例，实例就是一个对象[typeof new Number(22)//object]
>- {}/new Object/new function/====>创建对象的方式
```js
function fn(){
    console.log(this);//fn{}  this指向实例，实例就是一个对象
}
new fn;
```
```js
//面向对象的具体表现得代码
function fn(name,age,sex){
    this.name=name;
    this.age=age;
    this.sex=sex;
    this.say=function (){
        alert('今天是'+age)
    }
}
let p=new fn('易烊千玺',20,'男')
p.say()//调用
let pp=new fn('王凯',36,'男')
console.log(p.say==pp.say)//false
```
## 原型(prototype)==函数身上才会有原型(返回是object)，其他的原型返回undefined
- >在js中，所有的class(类)都是函数模拟出来的。
- 
## 复习
- 函数 
    - 普通函数:运行函数中的代码，为了复用。
    - 构造函数(class)
      - this实例
      - 默认return实例
      - 在类里面一般都是添加属性
      - new  构造函数
```js
function Fn(){
    this.name=111;
}
//相同的效果另一种写法
{
    name:111;
}
this.name:'xxx' === {name:'xxx'}//true
obj.name='xxx' === new Fn().name = 'xxx'//true
```
## 原型和原型链
>- 函数走原型(构造函数的实例)
>- 实例走原型链(实例找不到某个属性或方法就走原型链)
>- new Function -> function
# 
## 重写new
>- call/apply/bind ==> 共同的点：第一个参数都是改变this的指向。函数天生自带的属性。(原型链下的属性)
>- null undefined传了默认为window。
```js
//手写new
//看课件1
``` 
## class类
```js
class 类名{
    constructor(){
        //给自身添加属性或者方法，就必须要写constructor
    }
}
//在课件4
```
## call的使用
>- Object.prototype.toString.call()的机制
>- 所有的数据都有一个toString的方法，但是写法不一样，唯独Object的toString去检测当前的数据类型，所以可以把this改变，达到我们的目的。
>- 为什么call this就能借到某个方法？
- >因为这些方法内部使用的数据都是this
**Array.from()=》把类数组转化数组**
```js
const lis=document.getElementsByTagName('li')
//slice返回一个新数组，不传参就是把整个数组返回。
Array.prototype.mySlice=function(){
    //this是个数组，把this改成了类数组
    return [...this];
}
let arr=Array.from(lis)//类数组转化为数组
console.log(arr.mySlice())
arr.forEach((ele,i)=>{
    ele.onclick=function(){
        alert(i)
    }
})
console.log(arr.forEach)//出现函数说明arr数数组，出现undefined是类数组
//另一种方法
console.log(Math.max.apply(null,[1,2,3,4]))
```
## 数组的解构赋值
>- let [x,y]=[1,2]
>- 声明的时候一定要是个数组，左右两边的结构保持一致。
```js
//
    function f() {
        console.log('aaa');
    }
let x;
    if ([1][0] === undefined) {
        x = f();
    } else {
        x = [1][0];//数组[1]的下标[0]
    }
    console.log(x)//1

//另一道题
     function f() {
        console.log('aaa');
    }
    let [x = f()] = [1];
    console.log(x)//1
```
## 对象的解构赋值
>- let {key1,key2}={key1:val1;key2:val2}
>- 在声明的时候使用块声明，块中放对象的key值，这里的key值一定要和解构对象的key值名字要一致
>- 如果要取别名,使用老名字:新定义的名字即可。
```js
let {key1:kk,key2}={key1:val1;key2:val2}
```
>- 此时key1已经访问不到了，要访问就报错。只能访问kk，kk就代表key1
>- 名字和声明变量规则一致
```js
    /**
        传了对象那么就按照传的对象来解析，不会按照默认的来解析 
    **/
    function move({x, y} = { x: 0, y: 0 }) {
        return [x, y];
    }
    const {log} = console;
    log(move({x: 3, y: 8}));  //3,8
    log( move( {x: 3} )); //3,undefined
    log( move({}));//undefined,undefined
    log(move());//0,0
```
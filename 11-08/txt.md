## 复习
- 面向对象步骤
  >- 把所有的变量放到类中，把变量变成属性。
  >- 把函数抽像出来，挂在函数的原型上。
  >- 函数就是一个功能，就是把功能挂在构造函数的原型上。
```js
//两种区别
function move({x=0;y=0}={}){//{}的存在是为了什么都不传参的时候
    return  [x,y]
}
console.log(move({x:3;y:6}))//[3,6]
console.log(move({x:3}))//[3,0]
console.log(move({}))//[0,0]
console.log(move())//[0,0]
//**********************************
function move({x,y}={x:0,y:0}){
    return [x,y]
}
console.log(move({x:3,y:6}))//[3,6]
console.log(move({x:3}))//[3,undefined]
console.log(move({}))//[undefined,undefined]
console.log(move())//[0,0]
```
## 面向对象的三大特征
>- 封装、继承、多态
## 继承
>- 子类具有父类的一部分特征(相同的特征是从父类继承下来的)，自己还有自己的特征。
>- 继承的写法让子类的代码量减少很多，从而达到高内聚，低耦合的目的，减少了开发成本。 
- 继承的方式： 
   - 类式继承(call继承)
   - 原型继承
   - 寄生式组合继承
   - 拷贝继承
   - 对象继承
   - class继承
>- 继承的结果是  ==>能够继承父类的属性和方法
>- 继承属性:调用父类，通过call把this变为子类的实例即可(call继承)
>- 方法继承：通过浅拷贝，把父类原型上的方法或者属性赋值给子类的原型。
```js
Object.assign(子类.prototype,父类。prototype)
//在课件2上
//课件三详细介绍
```
## 如何避免两个赋址相同？
>- 需要两个不同的地址
>- B地址下拥有A地址下的原始类型的数据即可(原始类型的赋值)。
```js
//浅克隆
let  arr=[1,2,3,4];
let ary=[]
for(var i=0;i<arr.length;i++){
    //引用数据加上去会变成赋址状态
    ary[i]=arr[i]
}
ary.push(3)
console.log(arr);
console.log(ary);
console.log(arr==ary);//false
```
```js
//深克隆
let let ary = [1,2,3,[1,2,3,{name:[1,2,3]}]];
function deepclone(obj){
    //判断obj是不是一个对象，不是对象就不执行此函数。
    if（typeof obj !=='object' && obj !==null)return null;
}
// let o=Array.isArray(obj)?[]:{};
// 另一种写法 来确定值是数组还是对象
let o=obj.push?[]:{};
for(let attr in obj){
    //如果碰到引用类型就继续循环，原始类型才会赋值
    if(typeof obj[attr]==='object'){
        o[attr]=deepclone(obj[attr])
    }else{
        o[attr]=obj[attr]
    }
}
return o
}
let ary=deepclone(ary);
console.log(ary)

var ss=JSON.parse(JSON.stringify(ass))
ass=[1,2,3,[1,2,[[[[[3,4,3,[[[3]]]]]]]]]]
console.log(ss);
```

## 原型继承
```js
//在课件4
```
## 寄生组合继承
```js
  function Person(name,age){
        this.name = name;
        this.age = age;
    }
    Person.prototype.say = function(){
        alert(`我的名字叫`+this.name);
    }
  
    function Police (name,age){
        Person.call(this,name,age);
    }
    Police.prototype = Object.create(Person.prototype); //寄生式组合
    // ===》相同的效果===》Police.prototype.constructor = Police;
    Police.prototype.say = function(){
        alert(`我是警察`+this.name);
    }
    let p2 = new Police('赵炎',100);
    let p1 = new Person('刘成',19);
    p2.say();
    p1.say();
```
```js
let obj=Object.create({name:'aaa'})
console.log(obj);
/*{}
__proto__: 
name: "aaa"
__proto__: Object
*/
```
## class继承
>通过class中的static可以创建静态方法，只有类才能调用，实例是调用不到的就算是继承，也只能是继承子类去调用，子类的实例是调用不到的。
- >class 子类 extends 父类{}
- >super() ==>在后面使用this不会报错
```js
//在课件6
```
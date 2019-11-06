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
obj.name='ccc' === new Fn().name = 'xxx'//true
```
# 
## 重写new
>- call/apply/bind ==> 共同的点：第一个参数都是改变this的指向。函数天生自带的属性。(原型链下的属性)
>- null undefined传了默认为window。
```js
//手写new

``` 
## class类
```js

```
## call的使用
>Object.prototype.toString.call()的机制
## 
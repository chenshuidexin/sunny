## onload和ready
- >onload 当静态文件加载完之后执行时间中的代码(适合游戏开发)
   - 弊端：当静态资源比较大，加载慢的时候，会影响用户体验
- >ready  当DOM加载完成时触发，只管标签，不管静态资源(适合网页开发)
   - 原生的ready高版本浏览器使用   DOMContentLoaded
   - 低版本IE浏览器中是通过onreadystatechange事件去监听，监听在IE下只要DOM加载成功，会有一个加doScroll('left')一个方法
   但是如果DOM没有加载成功是没有这个方法，那么会报错，所以使用try去监听。
```
function ready(){
    try{
        document.documentElement.doScroll('left')
        onredy(function(){fn()})
    }catch(e){
        setTimeout(ready,500)
    }
}
```
```
document.addEventListener('DOMContentLoaded',function(){alert(999)})
```
## 发布订阅
-  模拟：element.addEventListener();
-  xx.fn('click',function(){})  订阅过程
-  xx.fn('click',function(){})  给某个元素的事件订阅一个事件函数
-  订阅的过程给某个事件订阅一个事件函数
- 订阅池就要为一个(能够存储多个值的空间)对象，这个对象存储的是同一个元素下的多个事件。
- 在同一事件下又有事件池，它为数组[],这个列表在每次订阅事件和事件函数的时候，在订阅池中存储某个相同事件，在相同事件的事件池中添加不同的事件函数。
- 当事件触发以后，发布之前订阅的所有事件函数(循环订阅池，去调用订阅池中的每个函数)
```js
//订阅器(存储器)
addEvent(btn,'click',function(){
    alert(1);
})
addEvent(btn,'click',function(){
    alert(2);
})
addEvent(btn,'click',ff);
function ff(){
    alert(3);
    console.log(this);
    removeEvent(btn,'click',ff);
}
addEvent(btn,'mouseover',function(){
    alert(99)
})
```
```
在课件1
```
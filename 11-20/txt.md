## 事件
>某个条件成立就会触发某个事件行为
```js
onclick//点击事件[一按一松才会触发事件]
onmouseout//鼠标移出事件
onmouseover//鼠标移入事件
onload//静态资源加载完成后执行函数中的代码
onchange//输入框改变之后触发(select改变value值也会触发)切换事件[input==同样的内容不变不会触发事件]
oninput//输入内容后触发[边添加边改变]
onerror//加载失败后触发
onresize//事件会在窗口或框架被调整大小时触发
onscroll//滚轮事件触发
onmousedown//鼠标按下[点击按钮未松开时已经触发事件]
onmouseup//鼠标抬起[松开按钮时才会触发事件]
onmousemove//鼠标滑过
onmouseenter//鼠标移入[解决冒泡困扰]
onmouseleave//鼠标移出[解决冒泡困扰]
onmousewheel//滚轮
//表单元素
onfocus//聚焦触发[一开始就会触发]
onblur//失焦触发[添写完成后离开才会触发]
```
```html
<!-- 查看关于on的事件 -->
<input type="text" id="txt">
```
```js
console.dir(txt);//查找on的事件
//课件2是放大镜效果中一个小环节还有其他的小案例
```
## 如果没有添加事件，某个元素身上有事件么？
>- 当一个元素创建出来的时候天生就自带事件，只不过默认值为null。
>- 如果这个元素有这个事件默认为null，如果没有这个元素的事件就为undefined[aa.onhaha//undefined]
>- 当用户操作页面的时候，浏览器会监听用户的操作行为，当用户触发了某个事件之后，如果对应的事件有事件函数，那就调用该事件函数，也就是说就算没有事件函数也会触发事件，没有响应只是因为没有绑定该事件函数。
## 事件对象
>当调用事件函数的时候，事件函数的第一个参数一定是事件对象
- >事件对象记录用户时触发事件时的细节信息
```js
ev.clientX/ev.clientY  
//这两个坐标是基于浏览器可视区的位置
ev.pageX/ev.pageY 
//这两个坐标是基于页面[加上滚动条的距离]
```
## 冒泡
>当触发某个元素事件函数的时候，如果祖先级节点绑定的事件和当前元素触发的事件一致，那么会依次执行。
- 从目标元素起，从下往上直到window为止的过程叫冒泡[从里到外向上冒泡]
- 阻止冒泡 ->目标元素是谁就阻止谁 ev.cancelBubble = true  不是标准，但是所有浏览器都兼容 -> ev.stopPropagation()  标准  但是低版本不兼容
- 触发事件不一样的时候不会出现冒泡
```js
//在课件3
```
```js
//冒泡的困扰
//来不及显示就已经结束
btn.onclick = function(ev){
box.style.display = 'block';
alert("候鸟飞过！")
//阻止冒泡
ev.cancelBubble = true;
}
window.onclick = function(){
box.style.display = 'none';
}
```
>冒泡的好处：
- ev.target 事件源(事件委托、事件代理)通过祖先节点的事件函数的事件对象(ev)，在该对象下有个target属性，这个属性表明用户触发事件的源头(目标元素)，好处是可以进行性能优化。
```js

```
## 动态获取和静态获取
>- getElements系列，children系列都是动态获取
>- querySelector系列是静态获取
```js
//在课件4
//获取value值在课件5
```
## onmouseenter和onmouseleave
>为了解决鼠标移入移出的穿透问题[解决冒泡问题]
```css
#box1{
width:100px;
height:100px;
background: tomato;
}
#box2{
width:30px;
height:30px;
background: turquoise;
}
```
```html
<div id="box1">
<div id="box2"></div>
</div>
```
```js
//onmouseout和onmouseover
    box1.onmouseover = function(){
        console.log('大盒子移入')
    }
    box1.onmouseout= function(){
        console.log('大盒子移出')
    }

    box2.onmouseover = function(ev){
        console.log('xiao盒子移入')
        // ev.cancelBubble = true;
    }
    box2.onmouseout = function(){
        console.log('xiao盒子移出')
    }
    //两者之间的区别
    //onmouseenter和onmouseleave
       box1.onmouseenter = function(){
        console.log('大盒子移入')
    }
    box1.onmouseleave = function(){
        console.log('大盒子移出')
    }

    box2.onmouseenter = function(ev){
        console.log('xiao盒子移入')
        // ev.cancelBubble = true;
    }
    box2.onmouseleave = function(){
        console.log('xiao盒子移出')
    }
```
## 解绑事件
- >1.btn.onclick=null;[事件函数重新赋值为null]
- >2.带on的事件方式是DOM0中的标准，只有冒泡没有捕获，不够强大===> DOM2中的事件绑定->addEventListener('不带on的事件'，函数，布尔值[默认为false，false为冒泡，true是捕获])
   - >捕获：从window起往下走知道目标元素的过程，从外往里找最开始的触发的元素
   ```js
   //要监听捕获过程就要通过addEventListener
   //在课件6中
   ```
## 什么叫做事件模型(事件流)
>从捕获到目标到冒泡的整个过程就叫事件模型(事件流) ==> 当用户触发某个事件的时候，会从window起自上而下一级一级往目标元素查找传递，只要绑定DOM2事件第三个参数为true就能捕获的过程;事件触发的源头，从源头起到window为止的过程就叫冒泡(DOM0,DOM2事件第三个参数没有或是false)。三个阶段:
  - 捕获
  - 目标 ==> 按照事件绑定的方式，目标元素的执行顺序是按照绑定的先后顺序来的(而不是先捕获后冒泡的基本顺序)，其他的事件都按着基本顺序而来。
  - 冒泡 
```js
//整个事件流
```
## 键盘事件
>当按下键盘的时候触发的事件
- onkeydown键盘按下  拿不到当前的value值
- onkeyup键盘抬起    拿到当前的value值
- ev.ctrlKey      布尔值：只要按着就为true
- ev.shiftKey     布尔值：只要按着就为true
- ev.altKey       布尔值：只要按着就为true
- 组合默认事件是用不了的，后面的按键会把前面的按键覆盖掉的
```js
txt.onkeyup=function(ev){//回车键和ctrl键的结合
    if(ev.keyCode === 13 && ev.ctrlKey){
        ul.innerHTML += `<li>${this.value}</li>`;
        this.value='';
    }
    console.log(ev.keyCode);
}
```
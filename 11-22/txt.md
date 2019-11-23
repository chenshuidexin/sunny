## 补充
- event对象[事件对象] window.event chrome(谷歌浏览器)默认为undefined,IE默认为null。
>- 常见形式: var e=ev||window.event  ==> 不会报错，只会为undefined/null  为了实现浏览器兼容
>- var e=ev||event    ==> IE下不会报错，返回event为true, 在其他浏览器中，event没有被定义，直接报错
```js
console.log(event)//windo上有这个属性[event]，chrom默认为undefined,IE默认为null
document.onclick=function(ev){
    console.log(ev)//打印出现事件对象
}
``` 
## 区别
- ev.pageY  基于整个页面(人为计算滚动条距离、已包含滚动条的距离)
- ev.client 基于可视区(滚动条的距离不受影响)
## 事件默认行为
>即不需要自己编写代码，浏览器自身所具备的一些功能。
- oncontextmenu 鼠标右键
```js

```
>阻止默认行为之前要知道是什么事件触发的行为
- 1.ev.returnValue = false ==> 去阻止默认行为(灵活性)
- 2.return false  ==>  阻止所有的默认行为(也可以针对性阻止) 阻止成功后可以用阻止冒泡的方式解锁默认行为
- 3.xxx.addEventListener('cilck',function(ev){ev.returnValue=false})
- 4.xxx.addEventListener('cilck',function(ev){ev.preventDefault()})
```js
//在课件2中
```
## 放大镜案例
```js
//在文件夹上
```
## 滚轮事件
>onscroll 滚动条改变的触发
- onmousewheel 滚轮事件[没有滚动条]
- 谷歌滚轮事件
- ev.wheelDelta 检测滚动的方向
  - 大于0是向上的
  - 小于0是向下的
- 火狐没有onmousewheel事件但是有addEventListener()进行事件绑定
- ev.detail检测滚轮方向
   - 大于0是向下的
   - 小于0是向上的
```js
//火狐浏览器滚轮事件
window.addEventListener('DOMMouseScroll',function(ev){
    if(ev.detail > 0){
        console.log('下')
    }else{
        console.log('上')
    }
})
```
```js
//谷歌浏览器滚轮事件
window.onmousewheel=function(ev){
    if(ev.wheelDelta > 0){
        console.log('上')
    }else{
        console.log('下')
    }
}
```
```js
//兼容两种浏览器的做法
//在课件3中
//一滚一屏在课件4
```
## 拖拽事件
>三大事件组成：onmousedown  onmousemove onmouseup 先要触发down才能触发move和up
```js
//在课件5
```
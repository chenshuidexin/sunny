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

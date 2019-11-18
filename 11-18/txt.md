## onscroll
>滚轮事件：当有滚动条的时候，滚轮即触发该事件
## 盒子模式的应用
## DOM：获取可视区的高度宽度
- >document.documentElement.clientHeigth
- >document.documentElement.clientWidth(如果有滚动的时候宽度会发生改变)
- >box.getBoundingClientRect()==>返回的是一个对象，放的是对象的绝对位置。
- >
## BOM: ===> window
- >window.innerHeight/window.innerWidth
- >包含滚动条的时候，滚动条的距离不予计算
- >window.pageXOffset/window.pageYOffset：滚动条的距离
## 图片延迟加载
>解决图片加载和数据请求问题，是提升网页速度最立竿见影的途径
## 重点：可视区宽度 + 滚动条的宽度 >= 图片显示的绝对位置
```js
//在
```
## arguments()  ===>  arguments[3]()==>arguments.3()this指向为arguments//undefined 
## onscroll
>滚轮事件：当有滚动条的时候，滚轮即触发该事件
```js
//在课件3
//单张图片加载类似
```
## 盒子模式的应用
## DOM：获取可视区的高度宽度
- >document.documentElement.clientHeigth
- >document.documentElement.clientWidth(如果有滚动的时候宽度会发生改变)
- >box.getBoundingClientRect()==>返回的是一个对象，放的是对象的绝对位置。
- >documnet.documentElement.scrollTop
## BOM: ===> window
- >window.innerHeight/window.innerWidth
- >包含滚动条的时候，滚动条的距离不予计算
- >window.pageXOffset/window.pageYOffset：滚动条的距离x/y轴
## 图片延迟加载
>解决图片加载和数据请求问题，是提升网页速度最立竿见影的途径
```js
const {log}=console;
const ih=window.innerHeight;
const li=document.querySelectAll('#ul li');
const li = new Tools;
window.scrollTop=fn;
fn();//及时获取位置
function fn(){
    //滚动条的距离[window.pageYOffset]
    let num=50;
    li.forEach((ele,i)=>{
        log(ele);
        //获取每张图片的绝对位置
        let {t}=t1.position(ele);
        if(ih+window.pageYOffset >= t && !ele.children[0].src)//照片路径不是空的需要显示出来
        ele.children[0].src=ele.children[0].dataset.src;//利用data自定义属性
        setTimeout(()=>{
            ele.children[0].style.opacity=1;//透明度的应用，效果更好些。
        },num*i);
    })
}
```
## 重点：可视区宽度 + 滚动条的宽度 >= 图片显示的绝对位置
```js
//在上文js中
```
```js
//在课件4中
```
## arguments()  ===>  arguments[3]()==>arguments.3()this指向为arguments//undefined 
## 重写forEach map replace
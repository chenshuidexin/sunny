## DOM
- 关系: 父子、兄弟
  - $('box').before($('<div>2</div>'))-->插到某个元素的前面
  - parent() --> parentNode   父级元素
  - parents()-->        某个元素的所有祖先节点，括号中可以精确匹配
  - prev() ---->previousElementSibling 上一个兄弟节点
  - next() ---> nextElementSibling  下一个兄弟节点
  - siblings()--> 当前元素的上兄弟节点和下兄弟节点
  - index('button')--->自定义属性 顺序默认基于父级，也可以精确匹配。
```js
//在课件2中
```
## jq事件
- 事件三大部分： 事件流  哪些事件其作用在哪儿  事件对象
- $('#xx').hover(function(){},function(){})===>onmouseeter+onmouseleave
- delegate:事件监听
```js
$('#box').delegate('li','click',function(){
    console.log($(this).text());
});
```
- JQ中的所有事件，都是on来二次封装，JQ中的事件全部都是事件绑定
- JQ的事件对象都是二次封装，如果要拿到真正的原生js事件对象  ==>  ev.originalEvent(原生事件对象)
- 解除事件$('vv').off().click() ---> 解绑上一次事件在重新开一个绑定事件，只出现一次
```js
//在课件
```
- JQ中阻止冒泡和默认行为，直接return false即可
- JQ拖拽事件
```js
//在课件4
```
## 动画
- hide(100) -----> 100毫秒之后隐藏
- show(100) -----> 100毫秒之后显示
- 在做jq动画时，要使用stop()把前面的动画清掉
- toggle() ------>改变宽高透明度
- slideToggle() -->改变高度
- fadeToggle()---->渐隐渐现
- animate()------->自定义设置
- $('xxx').delay()--->动画延迟
## 工具检测
- $.
- $.each((i,item)=>{}) ---> 相当于forEach((item,i)=>{})里面的形参位置不一样。
- $.ajax() --> 相当于fetch(url).then(e=>e.json()).then(data=>console.log(data)) 进行数据请求
- $.extend({},obj) 浅克隆==>Object.assign({},obj)
- $.extend(true,[],ary) 深克隆 第一个参数为true
```js
//数据请求
//一个网址为 https://www.baidu.com/sugrec?pre=1&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1462,21099,18560,29567,29700,29220,26350&cb=fn   [后台提供的，我们只负责拿到数据并操作数据]
$.ajax({
    url:'https://www.baidu.com/sugrec',
    data:{
        pre:1,
        ie:'utf-8',
        json:1,
        prod:'pc',
        from:'pc_web',
        sugsid:'1462,21099,18560,29567,29700,29220,26350',
        cb:'fn',
        //不需要把所有的数据都输入进去，具体的操作需要后台提供
    }
    dataType:'jsonp',
    success:function(d){
        d.g.forEach(item =>{
            let $li=$(`<li>${item.q}</li>`)
        })
        $('ul').append($li);//数据渲染
    }
})
```
## extend
- $.extend    工具方法 -> $.xx()
- $.fn.extend 功能方法 -> $().xx()
>扩展插件使用，extend里面写一个对象，对象的属性就是添加的方法名称，值就是函数。
```html
 <textarea id="txt"></textarea>
```
```js
 //功能方法（$()的方法）
$.fn.extend({
scrollH:function(){
return this[0].scrollHeight;
}
});
$(document).click(function(){
// console.log($('#txt').height())
// console.log($('#txt').innerHeight())
console.log($('#txt').scrollH());
});
```
```js
//jQ插件选项卡在课件5
```
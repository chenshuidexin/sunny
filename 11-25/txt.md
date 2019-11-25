## JQUERY
- 是一个js的类库，简化了document操作，动画操作，兼容性，数据请求操作。
-  https://www.jquery123.com/中文网
- 1.72版本
## 下载jquery库
- npm init -y  生成一个package.json文件
- npm install jquery -D
> 插件:ant.design[以后会用其样式的]
- jquery有多个版本
  - 源码版(学习版): jquery.js
  - 压缩版：jquery.min.js
  - 引用jquery方式：<script src="./node_modules/jquery/dist/jquery.min.js"></script>
## 选择器
>$  ->  jquery  ->  $('#box')  ->  获取是的一个jquery对象，因为是jquery对象就可以使用jquery的内置方法,原生对象用不了  ->  $('#box').css({width:100px,height:100,background:'red'}) -> 
- $() -> fn() --> 函数调用
```js
$('#box')------->获取唯一id名[id类名]
$('li')--------->获取所有li元素[标签]
$('.active')---->获取所有.active元素[class类名]
$('#ul li')----->获取ul里的所有li元素[子类选择器]
$('input[type="button"]')=$(':button') -->属性选择器[伪类选择器]
$('li:even')---->偶数，js从0开始计数[页面是奇数]
$('li:odd')----->奇数，js从0开始计数[页面是偶数]
$('div:eq(0)')-->找第1个div
$('div:first')-->找第1个div
$('div:last')--->找最后一个div
//在课件1中
//在课件2中
```
```js
$('xx').animate('width',200)--->转化效果
$('xx').val()------->获取当前的val值
$('xx').val('')------->重新赋值当前的val值
$('ss[class$="xx"]')-->获取结尾为xx的值
$('ss[class^="aa"]')-->获取开头为aa的值
$('ss[class!="aa"]')-->获取非aa的class值
```
## 属性操作
```js
attr------> getAttribute,setAttribute 获取和设置属性
removeAttr-------> removeAttribute 删除属性
prop-------------> 表单的状态布尔值(表单元素用)
val--------------> value表单内容
html-------------> innerHTML 样式
text-------------> innerText 文本
```
## 样式操作
```js
$('#xx').css()---->设置id名为xx的样式
css('width')------>获取当前元素的属性值
css('width',200)-->设置其属性
css({width:220,height:200})--> 批量设置
show()-----------> 显示
hide()-----------> 隐藏
```
## jquery对象和原生对象互相转化
- >原生对象转化jquery只需要包$()即可
```js
box  ->  $(box)  变成了jquery对象
```
- >jquery对象转原生对象
```js
$box  -> $box.get(0)||$box[0]
```
## DOM
```js
//在课件3中
```
## BOM
## 事件
## 字符串的code转换
>- 把字符串转成对应的编码值[动态方法]
- string.charCodeAt()==>'22'.charCodeAt()
>- 通过ASCII码转成对应的字符串
- String.fromCharCode(编码)==>String.fromCharCode(49)//'1'
## () --> 重复子项  \数字+   ==》 子项的个数，代表第n个子项
> 重复子项只能用在匹配子项之后
```js
let str='aaabbbbb'
str.replace(/(a)\1(b)\2/,function($0,$1)){
    console.log($0,$1)
}
```
## 重复子项(子项重定向)
>  \num ==> num代表的是一个子项，一定是和子项相匹配的
```js
let aa='11122222121'
aa.match(/(\d)\1+/g)//["111", "22222"]
aa.match(/(\d)\1+(\d)\2+/g))//["11122222"]
```
## 验证是否为一个合法的url
```js
 let str = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=js';
let re=/^(http)s?:\/\/w{3}\.[a-z]{2,18}(\.[a-z]{2,3}){1,2}\/[a-z]{1,10}\?(([a-z]\w{0,10})=([\w%-=]+)&?)+$/;
str.match(re);//数组
//queryURLParams
let re2=/([a-z]\w{0,10})=([\w=%-]+)/g;
let obj={};
str.replace(re2,(...arr)=>{
    let a=arr[1];
    let b=arr[2];
    obj[a]=b;
})
console.log(obj);
```
## 身份证
```js
let sfz=/^[1-8]\d{5}(19[2-9]\d|20[0-1]\d)(0[1-9]|[12]\d|3[01])\d{3}(\d|x)$/
let str='110981198208185629'
sfz.test(str)//布尔值
```
## 千分符
```js
('222122').replace(/(\d)(?=(\d{3})+$)/g,'$1,')
//$-->从结尾开始找三位数  ?= -->正则匹配
//$1 ---> 匹配到的每个子项
("123456").replace(/(?!^)(?=(\d{3})+$)/g, ",")
//?!^ ==>前负向查找开头用','添加
```
```js
//手写千分符
let str = '12332110'
let temp = '';
let num = 0;
for (let i = str.length - 1; i >= 0; i--) {//倒着找三位数加','
if ((temp.length - num) % 3) {//三位数为一组
temp += str[i];//挨着添加数据
} else {
temp += ',' + str[i];//三位数里添加','
num++;//为解决数组的塌陷性
}}
temp = temp.substring(1);//不要开头的','所以形成新的数组。
temp = temp.split('').reverse().join('');//把字符串给正过来带着','
console.log(temp)//如结果显示[12,332,110]
```
## JS盒子模型
>style为行内样式，样式表中的样式，style是获取不出来的
- getComputedStyle: 计算后的样式
- 要获取样式表中的样式可以使用：getComputedStyle(element).attr
```js
//使用方式
getComputedStyle(box).width
```
- 有时候需要隐藏某个元素，但是又要存一个当前元素的尺寸，这个时候使用getComputedStyle(element).attr
***注意：这种方法获取的值是带单位的***
**下面的属性结果都为不带单位的数字**
- clientWidth/clientHeight  盒子可视的宽度(支持padding)
- clientLeft/clientTop 左边框和上边框
- offsetWidth/offsetHeight  盒子可视的宽度(支持padding+border)
- offsetParent  定位父级(元素)
- offsetLeft/offsetTop 定位父级到当前元素的距离(当前元素的左外边框到定位父级的左内边框的距离)
```js
//在课件3
```
- scrollHeight/scrollWidth被内容撑开的高度和宽度，不计算边框在内。
- 在低版本IE下要触发haslayout属性，使用起来才不会出问题
- scrollTop/scrollLeft 滚动条的距离(每个浏览器的距离都不同)
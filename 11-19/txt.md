## exec[正则方法]
>如果是一个变量的正则，每次不断的去用正则调用exec，返回的结果总是下一次匹配的结果
```js
let aa='1212121212';
let rr=/1/g;
//查找存值功能
console.log(rr.exec(aa))
//["1", index: 0, input: "1212121212", groups: undefined]
console.log(rr.exec(aa))
//["1", index: 2, input: "1212121212", groups: undefined]
console.log(rr.exec(aa))
//["1", index: 4, input: "1212121212", groups: undefined]
console.log(rr.exec(aa))
//["1", index: 6, input: "1212121212", groups: undefined]
console.log(rr.exec(aa))
//["1", index: 8, input: "1212121212", groups: undefined]
console.log(rr.exec(aa))
//null
```
>当 RegExpObject 是一个全局正则表达式时，exec() 的行为就稍微复杂一些。它会在 RegExpObject 的 lastIndex 属性指定的字符处开始检索字符串 string。当 exec() 找到了与表达式相匹配的文本时，在匹配后，它将把 RegExpObject 的 lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。这就是说，您可以通过反复调用 exec() 方法来遍历字符串中的所有匹配文本。当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0(重新来过)。
## lastIndex[正则方法]
>是可以拿到当前匹配项之后第一个字符的位置[lastIndex属性所指的位置作为下次检索的起始点][必须有g的标志才可以使用]
```js
let aa='1212121212';    
let rr=/1/g;
//查找存值功能
console.log(rr.lastIndex);
//0
console.log(rr.exec(aa))
//["1", index: 0, input: "1212121212", groups: undefined]
console.log(rr.lastIndex);
//1
console.log(rr.exec(aa))
//["1", index: 2, input: "1212121212", groups: undefined]
console.log(rr.lastIndex);
//3
```
## findeIndex
>找到回调函数的中符合条件的索引值，找不到就返回-1
## 瀑布流
- 来源于花瓣网
## 防抖
>当高频率触发事件的时候不要执行函数内的代码，只要停下来的时候在加载图片(指向代码)
## 节流
>

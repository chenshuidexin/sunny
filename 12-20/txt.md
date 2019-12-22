## 关于ajax的小小总结
- fetch:ES6新的api，是基于promise，用的是promise的方法和返回peomise实例。默认请求数据的方式是get。但是post请求数据的方式是可以的。低版本不支持。
- axios里面有拦截器，方便做些钩子函数处理。是基于new XMLHttpRequest(xhr)的实例对象方法来封装的，可以监听细节问题，监听请求过程1-4，abort()方法强制中断，onabort()事件中断监听.
- XHR(浏览器自带api)和axios(基于这个XHR来封装的一个js库)
```
class F{};
console.log(typeof F)//function
```
## Set属性和方法
>ES6提供了新的数据结构——Set。它类似数组，但是成员的值都是唯一的，没有重复。
```js
//不含隐式转化
let set= new Set();
set.add(1);//数字
set.add('1');//字符串
console.log(set.size);//2
```
>Set内部使用Object.is()方法来判断两个数据项是否相等，唯一不同的是+0和-0在Set中被判断为是相等的。
>同时可以使用数组来构造Set，或者说具有迭代器的对象都可以用来构造Set，并且Set构造器会确保不会存在重复的数据项：
```js
const set=new Set([1,2,1,2,2,3,4,5,5,5]);
console.log(set);//Set(5) {1, 2, 3, 4, 5} 
console.log(set.size);//5
```
>new Set的方法
```
1.add()：添加某个值
2.delete()：删除某个值,返回一个布尔值，表示删除是否成功
3.has():返回一个布尔值，表示参数是否是Set结构的成员
4.clear():清除所有成员，没有返回值
5.size:项目的个数
```
```
遍历操作
1.keys():返回键名的遍历器
2.values():返回键值的遍历器
3.entries():返回键值对的遍历器
4.foreach():使用回调函数遍历每个成员 [三个参数改变this指向]
keys(),values(),entries()返回的都是遍历器对象。Set结构没有键名，只有键值，所以keys()和values()方法的行为完全一致
```
## Map属性和方法
>ES6中提供了Map数据结构，能够存放键值对，其中，键的去重是通过Object.is()方法进行比较，键的数据类型可以是基本类型数据也可以是对象，而值也可以是任意类型数据.
```
1.使用set()方法可以给Map添加键值对
2.通过get()方法可以从Map中提取值
3.has(),delete()以及clear()方法
 为了和Set的操作保持一致，Map中同样有has()方法，用来检查某个数据项是否存在于Map中，使用delete方法可以从Map中删除一个数据项，使用clear方法可以删除Map中所有的数据项
```
```
遍历操作
1.keys():返回键名的遍历器
2.values():返回键值的遍历器
3.entries():返回键值对的遍历器
4.foreach():使用回调函数遍历每个成员 [三个参数改变this指向]
keys(),values(),entries()返回的都是遍历器对象。Set结构没有键名，只有键值，所以keys()和values()方法的行为完全一致
```
for...of...
- >一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。
- >for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。
```
数组：for...in循环读取键名(能循环所有类型的属性)，for...of循环读取键值(循环具有数字索引的属性)。如果要通过for...of循环，获取数组的索引，forEach循环没有返回值。
Set 和 Map 结构：Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用for...of循环。
值得注意的地方有两个*****首先，遍历的顺序是按照各个成员被添加进数据结构的顺序。其次，Set 结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。
类似数组的对象：用于字符串、DOM NodeList 对象、arguments对象的例子。
对于字符串来说，for...of循环还有一个特点，就是会正确识别 32 位 UTF-16 字符。
并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。
对象:对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。但是，这样情况下，for...in循环依然可以用来遍历键名。
//课件2
```
## Generator函数
>http://es6.ruanyifeng.com/#docs/generator

>http://es6.ruanyifeng.com/#docs/generator-async

- 调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个**指向内部状态**的指针对象，也就是介绍的遍历器对象(Iterator Object)
```
小小总结:调用Generator函数，返回一个遍历对象，代表Generator函数内部的指针。一开始函数是不会执行的，因为它是个状态对象。
如何让这个Generator函数执行呢？
每次调用遍历对象的next方法，就会返回一个有着value和done两个属性的对象{value:xxx,done:false}
value属性表示当前的内部状态的值，是yield或者return表达式后面那个表达式的值。
done属性是一个布尔值，表示是否遍历结束。false代表遍历没有结束，true代表遍历结束。
每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
```
```
return和yield的区别
相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式。正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield。
```

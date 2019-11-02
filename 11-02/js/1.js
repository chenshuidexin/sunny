// console.log(a);//报错
// console.log(window)//有a，但不会提升。
// a=11;//挂在window下，但是前后顺序是不同结果
// console.log(a);//重新赋值为11





//this指向
// function fn(){
//     console.log(this);
// }
// document.onclick=fn;//#document 赋值
// document.onclock=fn();//window  函数调用直接出现在控制台上
// document.onclick=function(){
//     console.log(this);//document
//     fn();//点击才会出现window
// };
// document.onclick=(function(){
//     console.log(this)//window 只一个 
//     return fn;
// })()









function fn(){
    var a=10;
    function f(){
        console.log(a)
    }
    return f;
}
let ff=fn();
console.dir(ff);



// console.log(a,b,c)//undefined  报错  报错
// var a=12;
// b=13;
// c=14;
// function fn(a){
//     console.log(a,b,c);//10 13 14 向外面去找变量
//     a=100;//形参赋值 不是全局变量
//     c=200;//全局变量
//     console.log(a,b,c);//100 13  200 
// }
// b=fn(10);
// console.log(a,b,c)//12 undefined  200
// console.dir(window)

//git@github.com:chenshuidexin/sunny.git


// var ary=[12,23];
// function fn(ary){
//     console.log(ary);//[12,23]
//     ary[0]=100;
//     ary=[100];
//     ary[0]=0;
//     console.log(ary);//[0]
// }
// fn(ary);
// console.log(ary);//[100,23]


// var n=1;
// function  fn(){
//     var n=2;
//     function f(){
//         console.log(n);//2 2
//     }
//     f();//第一次调用
//     console.log(f)
//     return f;
// }
// var x=fn();
// x();//调用33行的函数  第二次调用
// console.log(n);//1


// var n=1;
// function fn(){
//     var n=2;
//     function f(){
//         n--;
//         console.log(n);//1 0 两次调用继续相减。
//     }
//     f();
//     return f;
// }
// var x=fn();
// x();
// console.log(n);//1




// var i=0;
// function a(){
//     var i=10;
//     function x(){
//         console.log(i)//10 第二次只是调用 并不是函数也在b空间
//     }
//     return x;
// }
// var y=a();
// y();
// function b(){
//     var i=20;
//     var z=a();
//     z();
// }
// b();



// var i=5;
// function fn(i){//1
//     return function (n){//2
//         console.log(n+(++i));//4
//     }
// }
// var f=fn(1);
// f(2);//4
// fn(3)(4);//8
// fn(5)(6);//12
// f(7);//10  (++i)调用两回后的i是3
// console.log(i)//5

// 闭包两大作用：保护(私有变量和外界没有必然联系);保存(形成不销毁的栈内存，里面的私有变量等信息被保存下来)



var i=20;
function fn(){
    i-=2;
    return function (n){
        console.log((++i)-n);//18
    }
}
var f=fn();
f(1);//18
f(2);//18
fn()(3);//16
fn()(4);//14
f(5);//14
console.log(i);//19

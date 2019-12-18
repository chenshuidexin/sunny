const style=localStorage.getItem('style');
if(!style){//本地存储没有样式就获取样式
    fetch('1.css').then(e=>e.text()).then(d=>{
        let link=document.createElement('style');
        link.innerHTML=d;
        document.querySelector('head').append(link);
        localStorage.setItem('style',d);
    })
}else{//有的话直接获取
    let link=document.createElement('style');
    link.innerHTML=style;
    document.querySelector('head').append(link);
}
// console.log(style);
//获取所有的li元素
const lis=document.querySelectorAll('#ul1 li');
//刷新本地的数据
let ary=JSON.parse(localStorage.getItem('gwc'))||[];
render(ary);//重新刷新购物车

//添加到购物车里
lis.forEach((ele,i)=>{
    ele.onclick=function(){
        if(!ary.includes(this.innerText)){
            //没有的话就添加保证是只会点击一次
            ary.push(this.innerText);
            //重新赋值
            localStorage.setItem('gwc',JSON.stringify(ary));
            render(ary);
        }
    }
})
//修改localStorage值，兄弟页面就会触发这个事件
window.onstorage=function(){
    //获取的数组要渲染页面
    ary=JSON.parse(localStorage.getItem('gwc'))||[];
    render(ary);
}
//删除购物车
//利用冒泡的场景
ul2.onclick=function(ev){
    if(ev.target.tagName === 'LI'){//事件源的标签名
        //过滤掉符合条件的项
        ary=ary.filter(item=>item !== ev.target.innerText)
        render(ary);
        localStorage.setItem('gwc',JSON.stringify(ary));
    }
}
//渲染页面
function render(ary){
    let html = ary.map(item=>`<li>${item}</li>`).join('');
    ul2.innerHTML=html;
}
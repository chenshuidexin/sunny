//面包屑过程
const {getParents}=tools;//获得一堆父级元素
const $breadnNav=$('.bread-nav');//获取横条导航
let list=null;//为以后进行赋值
function createMenu(id){//创建菜单
    $breadnNav.html('');//清空样式，为了方便下次重新进行样式
    let pary=getParents(id);//获取一堆的父级元素
    pary.forEach((item,i,all)=>{
        let $navChild=null;//导航子级为空
        if(i===all.length-1){//如果到达最后一个，就是当前的title
            $navChild=$(`<span>${item.title}</span>`)
        }else{
            //否则是有点击效果的title
            $navChild=$(`<a href="javascript:void(0)">${item.title}</a>`)
        }
        //导航子级的点击事件
        $navChild.click(function(){
            //获取当前元素子级的页面并且每个样式都为未点击状态
            //=>  checked为false
            tools.getChild(data,id).forEach(item=>item.checked = false);
            //重新渲染页面和面包屑导航
            render(item.id);
            createMenu(item.id);
        });
        //子级导航在前面
        $breadnNav.append($navChild);
    })
}
createMenu(0);
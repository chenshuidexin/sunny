//获取当前的文件夹盒子、隐藏显示文件夹、all的表框
const $folders=$('.folders');
const $f_empty=$('.f-empty');
const $checkedAll=$('#checkedAll');
//渲染页面
function render(num=0){//默认num为0
    $folders.html('');//清空文件夹样式，为了下一次更好的操作
    //通过数据和数值来获取当前的元素的子级
    let d=tools.getChild(data,num);
    list=d;//每一次进行页面渲染的时候有最新的数据，list对及时更新的数据进行存值。
    //没有子级的元素就返回一个背景图片[没有文件]
    //有子级的话，就显示出当前页面文件夹
    if(!d.length){
        $f_empty.show();
        return;
    }
    $f_empty.hide();
    //提前赋值给每个every为true
    let every=true;
    //每一次循环时给当前元素的every重新进行赋值
    //******************************************************* */
    $.each(d,(i,item)=>{
        if(!item.checked){//为false的值
            every=false;
            //移出类名checked
            $checkedAll.removeClass('checked')
        }
        //对象解构
        const {checked,id,title}=item;
        //创建文件夹的样式
        let $folder=$(`<div class="file-item ${checked?'active':''}" did=${id}>
        <img src="img/folder-b.png" alt="">
        <span class="folder-name">${title}</span>
        <input type="text" value="${title}" class="editor">
        <i class=${checked?'checked':''}></i>
        </div>`);
        //查找到元素img和i
        let $img=$folder.find('img');
        let $i=$folder.find('i');
        //小表框的点击事件
        $i.click(function(){
            //重新赋值取反
            data[id].checked=!data[id].checked;
            //渲染新的页面
            render(num);
        });
        //图像的双击事件
        $img.dblclick(function(){
            //获取当前元素的id 子级的父母就是自己
            let id=$(this).parent().attr('did')*1;
            //遍历数组中的checked值
            d.forEach(item=>item.checked=false);
            //清空all的样式
            $checkedAll.removeClass('checked');
            //重新渲染页面和面包屑导航
            render(id);
            createMenu(id);
        });
        //添加文件夹样式
        $folders.append($folder)
    });
    //all点击事件 => 为了方便下一次点击前进行清除
    $checkedAll.off().click(function(){
        d.forEach(item=>item.checked = !every);
        //重新渲染整个页面
        render(num);
    });
    if(every){//如果每一个值都是真的就在all上添加样式
        $checkedAll.addClass('checked');
    }
}
render(0);
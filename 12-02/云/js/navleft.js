//获取当前的删除和重命名样式
const $del=$('#del');
const $rename=$('#rename');
//删除点击事件
$del.click(function(){
    // 如果有一个checked为true值的话返回true。
    if(list.some(item=>item.checked)){
        let {pid}=list[0];//获取每一个对象的pid值
        list.forEach(item=>{
            if(item.checked){//如果为true值就会删除
                delete data[item.id];
            }
        });
        //重新渲染页面
        render(pid);
    }else{
        //一个没有的话就出现弹框
        alert('请选择文件')
    }
});
//重命名点击事件
$rename.click(function(){
    //获取当前checked为true的对象
    let reData=list.filter(item=>item.checked);
    //check值为true的对象进入这个执行代码
    if(list.some(item=>item.checked)){
        //只能选择一个文件夹
        if(reData.length===1){
            //获取的类名和标签名，方便对其进行操作。
            let $folder = $folders.find('.active');
            let $span=$folder.find('span');
            let $txt=$folder.find('input');
            $span.hide();//文字进行隐藏
            $txt.css('display','block');//当前的表框显示出来
            $txt.select();//文本全选和聚焦
            $txt.blur(function(){//文本失焦事件
                let val=$txt.val();//获取文本的value值
                if($span.text() === val){//如果当前的文本没有变化
                    $span.show();//文字出现
                    $txt.hide();//表框消失
                }else{
                    if(!val){//如果没有文本的话
                        console.log("请正确填写内容")
                        $txt.val($span.text());//用以前的文本进行赋值
                        $txt.select();//全选加聚焦
                        return;
                    }
                    let {id,pid}=reData[0];//获取当前对象的id和pid值
                    //过滤掉点击的对象(唯一的id值)，剩下它的兄弟级
                    let siblings=list.filter(item=>item.id !==id);
                    //如果title值相同的话
                    if(siblings.some(item=>item.title === val)){
                        console.log("重名了!");
                        $txt.select();//全选加聚焦
                    }else{//没有重名的话，当前的title为val并且checked重新赋值为false。
                        data[id].title=val;
                        console.log(data[id].checked)
                        data[id].checked=false;//点击时checked为true
                        render(pid);
                    }
                }
            })
        }else{alert("只能选择一个文件")}//多选择文件的情况
    }else{//一个没有选择的情况
        alert('请选择文件')
    }
})
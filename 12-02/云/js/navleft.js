//获取当前的删除和重命名样式
const $del=$('#del');
const $rename=$('#rename');
const $remove=$('#remove');
//删除点击事件
$del.click(function(){
    // 判断至少有一个文件进行删除，如果没有就找不到要删除的文件
    if(list.some(item=>item.checked)){
        let {pid}=list[0];//删除数据时，为的是重新渲染页面
        list.forEach(item=>{
            if(item.checked){//如果为true值就会删除
                delete data[item.id];
            }
        });
        render(pid);
    }else{
        //一个没有的话就出现弹框
        alert('请选择文件')
    }
});
//重命名点击事件
$rename.click(function(){
    returnVal = true;
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
                        //当修改成功之后就要阻止默认行为
                        returnVal=false,
                        data[id].title=val;
                        data[id].checked=false;//点击时checked为true
                        render(pid);
                    }
                }
            })
        }else{alert("只能选择一个文件")}//多选择文件的情况
    }else{//一个没有选择的情况
        alert('请选择文件')
    }
});

let that=null;
let okcode = -1;
function createModelTree(num){
    //通过num找到对应的子级，
    let ary=getChild(data,num);
    //如果没有子级就直接返回
    if(!ary.length)return;
    //创建一个ul，要插入li里
    let $ul=$('<ul style="padding-left:5px"></ul>');
    //循环子级数据，生成多个li
    ary.forEach(item=>{
        let $li =$(`<li>
        <div class="tree-title tree-ico">
        <span><i></i>${item.title}</span>
        </div>
        </li>`);
        if(!getChild(data,item.id).length){
            $li.find('i').css('background','none');
        }
        $li.off().click(function(){
            let reData=list.filter(item=>item.checked);
            //点击li的时候，看点击的文件和要移动的文件是不是有关系
            //如果有直系关系就点不开
            if(reData.some(d=>d.id === item.id)){
                okcode = 'error';
                return;
            }else{
                okcode=item.id;
            }

            if(that){
                that.css({background:'none'});
            }
            $(this).find('span').css({
                background:'#ccc'
            })
            that=$(this).find('span');
            if(this.children[0].classList.toggle('open')){
                $(this).append(createModelTree(item.id));
            }else{
                $(this).find('ul').remove();
            }
            return false;
        })
        $ul.append($li);
    })
    //返回当前创建的ul，里面有多个li(文件夹)
    return $ul;
}

const $model_list=$('#model_list').children();
$remove.off().click(function(){
    let reData=list.filter(item=>item.checked);
    // console.log(reData);
    if(!reData.length){
        console.log('没有移动的文件');
    }else{
        $('.modal-tree').show();//打开移动的框
        $model_list.find('ul').remove();
        $model_list.append(createModelTree(0));
    }
    const ok=$('.modal-tree').find('.ok');
    ok.off().click(function(){
        if(okcode === 'error'){
            console.log('非法操作')
            return;
        }
        //存值pid，重新渲染页面
        let id=reData[0].pid;
        reData.forEach(item=>{
            item.pid=okcode;
            item.checked=false;
        })
        $tree_menu.children().children().append(createTree(0,true));
        render(id);
        $('.modal-tree').hide()//隐藏弹框
    })
})
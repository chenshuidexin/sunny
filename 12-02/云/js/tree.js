const $tree_menu=$('.tree-menu');
// console.log(createTree(0));
function createTree(num,onoff){
    //true的话可以删除
    if(onoff){
        $tree_menu.children().children().find('ul').remove();
    }
    //通过num找到对应的子级
    let ary=getChild(data,num);
    if(!ary.length) return;
    let $ul=$(`<ul style="padding-left:5px"></ul>`);
    ary.forEach(item=>{
        let $li=$(`<li>
        <div class="tree-title tree-ico">
        <span><i></i>${item.title}</span>
        </div>
        </li>`);
        //如果没有子级的话就没有图片
        if(!getChild(data,item.id).length){
            $li.find('i').css('background','none');
        }
        $li.off().click(function(){
            if(this.children[0].classList.toggle('open')){
                $(this).append(createTree(item.id));
                render(item.id);
                createMenu(item.id);
            }else{
                $(this).find('ul').remove();
            }
            return false
        })
        $ul.append($li);
    }) 
    return $ul;
}
$tree_menu.children().children().append(createTree(0));
console.log( $tree_menu.children().children())
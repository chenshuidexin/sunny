const $tree_menu=$('.tree-menu');
function createTree(num,onoff){
    if(onoff){
        $tree_menu.children().children().find('ul').remove();
    }
    let ary=getChild(data,num);
    if(!ary.length) return;
    let $ul=$(`<ul style="padding-left:5px"></ul>`);
    ary.forEach(item=>{
        let $li=$(`<li>
        <div class="tree-title tree-ico">
        <span><i></i>${item.title}</span>
        </div>
        </li>`);
        if(!getChild(data,item.id).length){
            $li.find('i').css('background','none');
        }
        $li.off().click(function(){
            if(this.childern[0].classList.toggle('open')){
                $(this).append(createTree(item.id));
                CanvasRenderingContext2D(item.id);
                createTree(item.id);
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
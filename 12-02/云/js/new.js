const $create=$('#create');
console.log($create)
$create.click(function(){
const $floder=$(
    ` <li>
        <div class="tree-title tree-ico close">
        <span><i></i>我的文档</span>
        </div>
    </li>`
)
$folders.append($floder);
let $txt=$floder.find('input');
$txt.select();
$txt.blur(function(){
    let val =$txt.val();
    let nval='';
    let num=1;
    nval=val;
    while(bool){
        let s=val.replace(/\(\d)$/,'')+'('+num++ +')';
        bool=ary.map(item=>item.title).includes(s);
        navl=s;
    }
    ary.push({
        id:+new Date,
        title:nval,
    })
    render(ary);
})
})
const $fBox = $('#fBox');
const $kuang = $fBox.find('.kuang');
const { left:box_l, top:box_t } = $fBox.offset();
//解构赋值
//大块里的盒子鼠标按下事件
$fBox.on('mousedown', function (ev){
    // alert(11)
    //获取按下时当前的具体位置
    let disx = ev.pageX, disy = ev.pageY, 
    $floder = $folders.find('.file-item');
    //再按下的时候，通过ev.target去判断，当前元素是不是文件夹，或者看目标元素的父级是不是文件夹，如果是就不让框显示出来。
    if ($(ev.target).closest('.file-item').length)
        return;
//kuang显示出来时的样式
    $kuang.show().css({
        left: disx - box_l,
        top: disy - box_t,
        border: '1px dashed blue'
    });
    //大块区域的鼠标滑过事件
    $fBox.on('mousemove', function (ev) {
        $kuang.css({
            //move - down的值是正数
            width: Math.abs(ev.pageX - disx),
            height: Math.abs(ev.pageY - disy),
            //鼠标移动的距离[基于可视区的]
            left: Math.min(ev.pageX, disx) - box_l,
            top: Math.min(ev.pageY, disy) - box_t,
        });
        //move过程中，触碰几个文件元素
        $floder.each((i, ele) => {
            // console.log($kuang)
            if (guang($kuang[0], ele)) {
                list.forEach(item => {
                    //数据的id和碰到的did去比较，如果相等就把item的值设置为true。
                    if (item.id === $(ele).attr('did') * 1) {
                        item.checked = true;
                        $(ele).find('i').addClass('checked');
                        $(ele).addClass('active');
                    }
                });
            } else {
                list.forEach(item => {
                    if (item.id === $(ele).attr('did') * 1) {
                        item.checked = false;
                        $(ele).find('i').removeClass('checked');
                        $(ele).removeClass('active');
                    }
                })
            }
            //如果全选上就勾上全选，否则取消全选
            if (list.every(item => item.checked)) {
                $checkedAll.addClass('checked');
                every = true;
            } else {
                $checkedAll.removeClass('checked');
                every = false;
            }
        })
    })

    $(document).on('mouseup', function (ev){
        $fBox.off('mousemove');
        $(document).off('mouseup');
        //鼠标抬起时画框的样式
        $kuang.css({
            width:0,
            height:0,
            display:'none',
            border:'none',
            top:0,
            left:0,
        })
        // returnVal  只要是returnVal为true(不需要阻止默认行为的时候，就没不需要画框)
        if(ev.pageX === disx && ev.pageY === disy && !returnVal){
            list.forEach(item=>item.checked=false);
            $floder.each((i,ele)=>{
                $(ele).find('i').removeClass('checked');
                $(ele).removeClass('active');
            })
            every=false;
            $checkedAll.removeClass('checked');
        }
    })
    //事件对象的属性
    ev.originalEvent.returnValue= returnVal;

})
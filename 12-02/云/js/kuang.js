const $fBox = $('#fBox');
const $kuang = $fBox.find('.kuang');
const { left: box_l, top: box_t } = $fBox.offset();

$fBox.on('mousedown', function (ev){
    let disx = ev.pageX, disy = ev.pageY, $floder = $floders.find('.file-item');
    if ($(ev.target).closest('.file-item').length)
        return;


    $kuang.show().css({
        left: disx - box_l,
        top: disy - box_t,
        border: '1px dashed blue'
    });
    $fBox.on('mousemove', function (ev) {
        $kuang.css({
            width: Math.abs(ev.pageX - disx),
            height: Math.abs(ev.pageY - disy),
            left: Math.min(ev.pageX, disx) - box_l,
            top: Math.min(ev.pageY, disy) - box_t,
        });
        $floder.each((i, ele) => {
            if (guang($kuang[0], ele)) {
                list.forEach(item => {
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
            if (list.every(item => item.checked)) {
                $checkedAll.addClass('checked');
                every = true;
            } else {
                $checkedAll.removeClass('checked');
                every = false;
            }
        })
    })

    $fBox.on('mouseup', function (ev){
        $fBox.off('mousemove');
        $(document).off('mouseup');
        $kuang.css({
            width:0,
            height:0,
            display:'none',
            border:'none',
        })
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
    ev.originalEvent.returnValue= returnVal;

})
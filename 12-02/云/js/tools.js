let tools=(function(){
    //获取当前元素的子级
    function getChild(data,id=0){//数据 默认id为0
        //如果没有id就要返回空
        if(!data[id])return null;
        //获取对象的key值存值在数组中
        let ary=Object.keys(data);
        //此时的id为0，找出符合pid为0的对象，有三个在当前页面出现
        return ary.filter(item=>data[item].pid === id).map(item=>data[item]);
    }
    function getChilds(id=-1){
        let ary=Object.keys(data);
        return ary.filter(item=>data[item].pid === id).map(item=>data[item]);
    }
//获取当前的父级元素
    function getParent(id){
        //要是pid值为-1，就到头了就返回空值
        if(data[id].pid === '-1')return null;
        //否则就返回当前的pid值的对象
        return data[data[id].pid]
    }
    function getParents(id){//获取一堆的父级元素
        //每一次获取一个父级元素
        let pdata=getParent(id);
        //添加到新的数组中得到一堆父级元素
        let ary=[data[id]]
        //pdata有值的话就添加到数组的开头
        while(pdata){
            ary.unshift(pdata);
            //获取新的父级元素(上上一层)
            pdata=getParent(pdata.id)
        }
        return ary;
    }
    function guang(obj,obj2){
        //obj是画框，需要移动
        let {left:l,top:t,bottom:b,right:r}=obj.getBoundingClienct();
        let {left:l2,top:t2,bottom:b2,right:r2}=obj2.getBoundingClienct();
        if(r<l2||l>r2||t>b2||b<t2){
            return false;
        }else{
            return true;
        }
    }
    //返回的是子级元素和一堆父级元素
    return{getChild,getParents,guang,getChilds}
})();
/*
小小总结：操作数据是比较简单的，通过每个对象中的唯一id值去找同一对象中的pid值，所有对象中相同的pid值是在同一个页面,所以通过某个对象数值的监控就会找到相对应的页面布局
每一个对象中有checked的值，为了更加方便操作对象数据，比如判断是否符合删除的条件。。。
*/ 
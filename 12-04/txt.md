## 动画 transform
- translate(xpx,ypx)  => translateX() 和 translateY()  -> px
- rotate(xdeg) 角度旋转 -> 单位deg 如果是逆时针就需要-10deg
- scale(x)  缩放    -> 初始值为1(正常大小),比1大就放大多少倍，反之是缩小多少倍 + opacity 可以是渐隐效果
- skew(x,y)   倾斜    ->围绕x,y轴旋转角度 
- transform-origin  基准点 ->  默认为center center; -> left top center bottom  right length  %  一般在动画前设置
## 过渡 transition
- property 运动的属性
```
transition-property:top => 运动只作用于top
```
- duration 规定完成过渡效果需要的时间
```
transition-duration:1s    一秒执行完
```
- delay  定义过渡效果何时开始
```
transition-delay:2s   在过渡效果开始前等待2秒。
```
## requestAnimationFrame 
>采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销，也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果
```
优点：
  1.requesAnimationFrame会把每一帧中的DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流时间间隔紧紧跟随浏览器的刷新频率
  2.在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的CUP、GPU和内存使用量
  3.requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销

  requestAnimationFrame(函数)

  写一个有名自执行函数，里面使用requestAnimationFrame在里面调用有名自执行函数
  也有一个返回值，返回值数字 -->  编号
  
   let timer;
   (function move(){
       timer=requesAnimationFrame(function(){
           box.style.left=box.offsetLeft + 10 + 'px';
           move();
       })
   })()

  cancelAnimationFrame(编号) -->  关闭动画
```
## viewport
- 通常viewport是指视窗、视口、浏览器上(也可能是一个app中的webview)用来显示网页的那部分区域。在移动端和pc端视口是不同的，pc端视口是浏览器窗口区域，而在移动端有三个不同的视口概念:布局视口、视觉视口、理想视口。
   - 布局视口
   >在浏览器窗口css的布局区域，布局视口的宽度限制css布局的宽。为了能在移动设备上正常显示那些为pc端浏览器设计的网站，移动设备上的浏览器都会把自己默认的viewport设为980px或其他值，一般都比移动端的浏览器可视区域大很多，所以会出现浏览器出现横向滚动条的情况。
   - 视觉视口
   >用户通过屏幕看到的页面区域，通过缩放查看显示内容的区域，在移动端缩放不会改变布局视口的宽度，当缩小的时候，屏幕覆盖的css像素变多，视觉视口变大，当放大的时候，屏幕覆盖的css像素变少，视觉视口变小。
   - 理想视口
   >一般来讲，这个视口其实不是真的存在的，它对设备来说是一个最理想布局视口尺寸，在用户不进行手动缩放的情况下，可以将页面理想地展示。那么所谓的理想宽度就是浏览器(屏幕)的宽度了。
   ## 如何设置理想视口
   >在html的header中加入一段很重要的代码
   ```
      <meta name="viewport" content="width=device-width,user-scalable=no, initial-scale=1.0,maximum-scale=1.0,minimun-scale=1.0">
   ```
   - 它是设置了理想视口，将布局视口的宽度设置成了理想视口(浏览器/设备屏幕的宽度)。
   - 视口宽度等均是css像素，所以需要了解几个基本概念。
     - css像素:代码中使用的逻辑像素，衡量页面上的内容大小。
     - 设备像素：即物理像素，控制设备显示的单位，与设备、硬件有关。
     - 设备独立像素：与设备无关的逻辑像素，不同于设备像素(物理像素)，不真实存在的。
     - 设备像素比:定义设备像素与设备独立像素比的关系，设备像素比=物理像素/设备独立像素。
     - 分辨率：指的是屏幕上垂直和水平的总物理像素。
## meta标签
- width  ==   定义视口的宽度，单位为像素   ==  正整数或设备宽度deviceWidth。
- height ==   定义视口的高度，单位为像素   ==  正整数或deviceHeight。
- initial-scale  ==  定义初始缩放值      ==  整数或小数
- minimum-scale  ==  定义缩放最小比例，它必须<=maximum-scale设置值  ==  整数或小数
- maximum-scale  ==  定义放大最大比例，它必须>=minimum-scale设置值  ==  整数或小数
- user-scalable  ==  定义是否允许用户手动缩放页面，默认值为yes   ==   yes或no
## 适配的几种方案
- 1.css3媒体查询:通过媒体查询的方式，编写适应不同分辨率设备的css样式
```
@media screen  and (max-width:320px){
    ...适配iPhone4的css样式
}
@media screen and (max-width:375px){
    ...适配iPhone6/7/8的css样式
}
@media screen and (max-width:414px){
    ...适配iPhone6/7/8 plus的css样式
}
```
   - 优点：方法简单，只需要修改css文件   调整屏幕宽度时不用刷新页面就可以响应页面布局
   - 缺点: 代码量大，不方便维护   不能够完全适配所有的屏幕尺寸，需要编写多套css样式
- 2.百分比布局方案:给元素设置百分比，不固定宽度，使得在不同的分辨率下都能达到适配。
```
各个子元素或属性的百分比是根据谁来设定的呢？
1.子元素width、height的百分比:子元素的width或height中使用百分比，是相对于子元素的直接父元素。
2.margin和padding的百分比:在垂直方向和水平方向都是相对于直接父元素的width，而与父元素的height无关。
3.border-radius的百分比:border-radius的百分比是相对于自身宽度，与父元素无关。
``` 
   - 优点：宽度自适应，在不同的分辨率下都能达到适配
   - 缺点: 百分比的值不好计算  需要确定父级的大小，因为要根据父级的大小进行计算  各个属相中如果使用百分比，相对父元素的属性并不是唯一的  高度不好设置，一般需要固定高度
- 3.rem方案
  - >rem单位:rem是一个只相对于浏览器的根元素(HTML元素)的font-size的来确定的单位。默认的情况下，html元素的font-size为12px
  - >通过rem来实现适配:rem单位都是相对于根元素的html的font-size来决定大小的，根元素的font-size相当于提供了一个基准，当页面的宽度发生变化时，只需要改变font-size的值，那么以rem为固定单位的元素的大小也会发生响应的变化。需要先动态设置html根元素的font-size，在计算出其他页面元素以rem为固定单位的值。
```js
//rem公式套用
//在课件1中
```
- font-size一般情况下还是使用px，因为在rem中，只要使用rem单位都会被转换，那么在转换的时候，会出现不能被整除或者出现小数的情况，那么在显示的时候就可能出现一些偏差。而且如果期望在小屏幕下面显示跟大屏幕同等量的字体，但是由于rem的等比缩放，在小屏幕下就会存在小屏幕字体更小的情况，所以对于字体的适配更好的做法就是使用px和媒体查询进行适配。
  - 优点:rem单位是根据根元素font-size来决定大小，只要改变font-size的值，以rem为固定单位的元素大小也会发生响应式的改变
  - 缺点:必须通过一段js代码控制font-size的大小    控制font-size的js代码必须放在页面第一次加载完成之前，并且放在引入的css样式代码之前。
  ```
  rem公式放的位置
  <title>Document</title>
  <script>//rem公式</script>
  <style>//css样式</style>
  ```
- 4.vw、vh方案:css3中引入与视口有关新的单位vw和vh，vw表示相对于视口的宽度，vh表示相对于视口高度。
- vw   相对于视口的宽度，视口宽度是100vw
- vh   相对于视口的高度，视口高度是100vh
- vmin vw和vh中较小的值
- vmax vw和vh中较大的值
- >vw单位换算:视口宽度为100vw占满整个视口区域，那么1vw相当于占整个视口宽度的1%，所以1px=1/375*100vw所有的页面元素都可以直接进行计算换成vw单位，但是这样计算和百分比方案计算比较类似，都会比较麻烦。
- >但有一个插件---->postcss-px-to-viewport,可以预处理css，将px单位转换成vw单位，但是需要进行webpack配置
```
{
    loader: 'postcss-loader',
    options: {
    	plugins: ()=>[
        	require('autoprefixer')({
        		browsers: ['last 5 versions']
        	}),
        	require('postcss-px-to-viewport')({
        		viewportWidth: 375,
        		viewportHeight: 1334,
        		unitPrecision: 3,
        		viewportUnit: 'vw',
        		selectorBlackList: ['.ignore', '.hairlines'],
                minPixelValue: 1,
                mediaQuery: false
        	})
    	]
}
```
- 接下来是对postcss-px-to-viewport配置中的属性的介绍：
   - viewportWidth     视口宽度(数字)
   - viewportHeight    视口高度(数字)
   - unitPrecision     设置的保留小数位数(数字)
   - viewportUnit      设置要转换的单位(字符串)
   - selectorBlackList 不需要进行转换的类名(数组)
   - minPixelValue     设置要替换的最小像素值(数字)
   - mediaQuery        允许在媒体查询中转换px(true/false)
- 优点:指定vw\vh相对于视口的宽高，由px单位换算成vw单位比较简单    通过postcss-px-to-viewport插件进行单位转换比较方便
- 缺点:直接进行单位换算时百分比可能出现小数，计算不方便。  兼容性-大多数浏览器都支持，IE11不支持 少数低版本手机系统ios8、Android4.4以下不支持。

### 百分比和vw的百分比
%    width、height等大部分相对于直接父元素，border-radius、translate、background-size等相对于自身
vw    只相对于视口宽度
## 移动端的触屏事件
- touchstart 手指触摸屏幕时触发，即使已经有手指在屏幕上也会触发。
- touchmove 手指在屏幕滑动时触发。
- touchend 手指从屏幕时移开时触发。
### 时间定义的方式
>大致上分为DOM0事件和DOM2事件两种.
- DMO0事件，就是传统的直接将事件作为属性设置的形式
- 复制代码DOM2事件，则是用addEventListener的方式来绑定事件处理程序：
- >复制代码大多数时候不推崇第一种方式，这种方式在移动端使用时好时坏，不建议使用。
### PC的事件比移动端上的事件响应的慢300ms:
- >在早期的手机上，浏览器为了能够实现放大和缩放功能，采用双击的方式来达到这样的交互效果，为了实现这样的效果，浏览器需要判断用户在第一次触碰屏幕之后，是否在300ms之内再次点击，有则表明用户希望缩放和放大，所以click事件会推迟到300ms之后运行。
- >可以看到每次点击，touchstart总会先于click事件运行。
```
注意到前面的例子里每一个事件处理程序都有一个evt的参数了吗，那是有关于当前触摸的相关信息，通过这样一个对象，能够获取到当前触碰的坐标，触碰的手指个数等等。 其中最重要的常用的莫过于手指列表了。
touches:当前位于屏幕下的手指列表信息
targetTouches: 当前位于当前元素下的手指列表信息
changedTouches: 当前涉及到当前事件的手指列表
var div = document.querySelector("#div");
         div.ontouchmove = function(evt){
            this.innerHTML = `
                touches-length:${evt.touches.length}
                targetTouches-length:${evt.targetTouches.length}
                changedTouches-length:${evt.changedTouches.length}
                `
            console.log(evt);
        }
```
## 局域网传送手机端
>调试自己的手机
- >1.同一个wifi要连上手机和pc端，要使用到局域网
- >2.在html页面上右键点击[Open with Live Server]
- >3.在window开始页面上搜索栏 => 输入cmb[命令提示符] =>  输入ipconfig  ->  查找ip  ->  ip下的IPv4 -> 数字如[172.18.1.223]  ->  替换掉原有的部分open网址再次刷新
```
按照手指放到屏幕上来计算
  targetTouches：触碰到元素身上触发，随着手指的增多，会动态更新。
  touches：随着手指的增多，会动态更新。
按照当前手指触摸来计算
  changedTouches:当一个手指按下的时候，再放下另一根手指，这个时候还是会显示出一根手指，虽然已有两个手指。但是两个手指同时放到屏幕上显示出两个手指。
移动端触点使用
   按下和移动的时候要使用targetTouches
   抬起的时候使用changedTouches
```
## audio事件
### 标签属性
- autoplay：自动播放
- controls：显示控件
- loop：循环播放
- preload：音频在页面加载时进行加载
- src：音频链接
### 方法
- 1.canPlayType()：检测浏览器是否支持音频类型，返回值
```
probable'：浏览器最可能支持该类型
'maybe'：可能支持
''：不支持
```
- 2.load()：重新加载音频，用于更改src之后使用，无参数，无返回值
- 3.play()：播放音频，无参数，返回一个promise
- 4.pause()：暂停音频，无参数，无返回值
### 只读属性
- 1.buffered
```
audio.buffered.end(0)：获取已缓冲的秒数
audio.buffered.length：获取缓冲范围
audio.buffered.start(index)：获取某个已缓冲返回的开始位置
audio.buffered.end(index)：获取某个已缓冲范围的结束位置
```
- 2.currentSrc：返回当前音频的URL
- 3.currentTime：返回当前音频的现在时间
- 4.ended：音频是否结束
- 5.duration：返回音频时长，以秒计
- 6.networkState：返回音频的网络状态
```
0:尚未初始化
1:已经选取资源，但未使用网络
2:正在下载数据
3:未找到资源
```
- 7.paused：是否处于暂停状态
- 8.played
```
audio.played.length：已播放范围数量
audio.played.start(index)：获取某个已播范围的开始位置
audio.played.end(index)：获取某个已播范围的结束位置
```
- 9.readyState：音频当前状态
```
0：没有关于音频或视频是否就绪的信息
1：关于音频或视频就绪的元数据
2：关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧
3：当前及至少下一帧的数据是可用的
4：可用数据足以开始播放
```
- 10.seekable：返回可寻址的时间范围
```
seekable.length：可寻址范围数量
seekable.start(index)：可寻址范围的开始位置
seekable.end(index)：可寻址范围的结束位置
```
- 11.seeking：用户是否在寻址
### 可读写的属性
- 1.autoplay：是否自动播放，默认为false
```
audio.autoplay = false;
audio.autoplay = ture;
```
- 2.constrols：是否显示控件，默认为false
- 3.currentTime：音频当前播放位置，以秒计
- 4.defaultMuted：初始是否静音，默认为false
- 5.muted：是否静音，默认为false
- 6.defaultPlaybackRate：默认播放速度
```
1：正常速度
0.5：半速
2：倍速
-1：向后正常速度
-0.5：向后半速
```
- 7.playbackRate：播放速度
```
1：正常速度
0.5：半速
2：倍速
-1：向后正常速度
-0.5：向后半速
```
- 8.loop：是否循环播放，默认为false
- 9.preload：是否在页面加载后立即加载
```
auto：一旦页面加载，则开始加载音频或视频
metadata：当页面加载后仅加载音频或视频的元数据
none：页面加载后不加载音频或视频
```
- 10.src：地址源
- 11.volume：音量，范围0-1
### JS事件触发
- 1.加载时触发
```
loadstart:浏览器开始寻找指定的音频或视频
progress:浏览器正在下载指定的音频或视频
durationchange:音频或视频的时长已改变
loadedmetadata:音频或视频的元数据已加载
loadeddata:音频或视频的当前帧已加载，但没有足够数据播放下一帧
canplay:浏览器能够开始播放指定的音频或视频
canplaythrough:音频或视频能够不停顿地一直播放
progress:浏览器正在下载指定的音频或视频
```
- 2.加载出错时触发
```
abort:在音频或视频终止加载时触发
error:在音频或视频加载发生错误时触发
stalled:在浏览器尝试获取媒体数据，但数据不可用时触发
suspend:在音频或视频数据被阻止加载时触发(可以是完成加载后触发，或者因为被暂停)
empted:在发生故障并且文件突然不可用时触发
```
- 3.改变状态触
```
play:音频或视频文件已经就绪可以开始播放时触发
playing:音频或视频已开始播放时触发
ended:音频或视频文件播放完毕后触发
pause:音频或视频文件暂停时触发
ratechange:播放速度改变进触发
seeked:指示定位已结束时触发
seeking:正在进行指示定位时触发
timeupdate:播放位置改变时触发[注意:播放和调整指示定位时都会触发]
volumechange:音量改变时触发
waiting:需要缓冲下一帧而停止时触发
```
- 4.总结以上开发常用事件
```
play:音频或视频文件已经就绪可以开始播放时触发
ended:音频或视频文件播放完毕后触发
pause:音频或视频文件暂停时触发
timeupdate:播放位置改变时触发[注意:播放和调整指示定位时都会触发]
volumechange:音量改变时触发
abort:在音频或视频终止加载时触发
canplay:浏览器能够开始播放指定的音频或视频
```
## 使用Audio()构造函数可以构造一个audio实例
## H5 
>H5其实是移动端的一个统称。
- >HTML5  ->  H5  ->  移动端
- > HTML5是HTML最新的修订版本，2014年10月由万维网(W3C)完成标准制定。
- >HTML5设计的目的是为了在移动设备上支持多媒体。
- SEO 使用HTML5的新添加的标签可以有助于SEO优化，目的就是让页面更有语义化。
```
nav  导航
section 当div使用
footer  页脚
header  页头
article 当做p标签来用(文章)
audio  音频
video  视频
source 兼容多个音频视频格式的配置
  ```
        <audio controls>
            <source src="horse.ogg" type="audio/ogg">
            <source src="horse.mp3" type="audio/mpeg">
        </audio>
  ```
canvas 画图的(位图)
svg  矢量图
```

```
autofocus   input自动聚焦
maxlength   设置最多有多少个字符
multiple    可以选择多个文件(在上传的时候)
placeholder 输入之前的提示

type:
  number  只显示数据，有上下箭头
  color   可以取色
  search  可以清空的小×
  week     小日历插件
  reset   重置(需要配合form表单使用)
```

pattern：
规定用于验证 <input> 元素的值的正则表达式。
适用于下面的 input 类型：text、search、url、tel、email 和 password。


控件files
```
如何拿到用户传入的数据？
在file控件元素下有一个files属性，files[0]就是上传的数据

    btn.onclick = function(){
        console.dir(file.files[0]);
        console.dir(file.files.length);
    }
```
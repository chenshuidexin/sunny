## 文件系统  
- 通过全局对象下的__filename能够获取当前文件的绝对路径(包含文件本身)
- __dirname表示当前执行脚本所在的目录(运行文件的根目录),不包括文件的本身
```js
const path=require('path')//找路径
path.join('wwwroot','./api.js')//拼接路径
path.resolve('/','./2.js')//z最后一个参数要加./,要不然出不来
path.resolve(__dirname,'./1.js')//自动帮我们找到当前文件的路径和配置路径进行链接 
```
## readdir 读取文件夹的
```
fs.readdir(path,(error,filesAry)=>{})
```

## writeHead  设置响应头
```
第一个参数：状态码
第二个参数：{配置响应信息}
```

qs.parse()将URL解析成对象的形式

qs.stringify()将对象 序列化成URL的形式，以&进行拼接


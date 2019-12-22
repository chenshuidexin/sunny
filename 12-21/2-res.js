const http=require('http');
const fs=require('fs');
http.createServer((req,res)=>{
    //为了防止报错代码不执行
    console.log(req.url)
    try{
        //
        let url=req.url;
        if(url === '/'){
            url='/index.html';
        }
        let data=fs.readFileSync('www'+url)//某个文件夹下的文件需要加上路径。
        res.write(data.toString());//转化为字符串
        res.end();
    }catch(error){
        let data=fs.readFileSync('www/404.html');
        res.write(data.toString());//可以换成相对应的404页面
        res.end();
    }
}).listen(80);
const http=require('http');//模块化开发
const fs=require('fs');
const urlModel=require('url');//把url分割成路径，查询信息
const qs=require('querystring')//把url序列化操作。
const app=http.createServer((req,res)=>{
    const {pathname,query}=urlModel.parse(req.url);
    let lastName=['\.js$','\.css$','\.html$','\.less$'];
    let re=new RegExp(lastName.join('|'));
    if(pathname === '/'){
        let data=fs.readFileSync('www2/index.html');
        res.end(data.toString());
    }
});
let port=80;
app.listen(port);
//当服务器报错的时候触发
app.on('error',e=>{
    if(e.code === 'EADDRINUSE'){
        port ++;
        app.listen(port);
    }
})
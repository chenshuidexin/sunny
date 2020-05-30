const http=require('http');//模块化开发
const jquery=require('jquery');//node_modules里面自带
const fs=require('fs');//文件系统
const urlModel=require('url');//把url分割为路径，查询信息，hash...
const qs=require('querystring')//url序列化操作
const app=http.createServer((req,res)=>{
    let originAry=[
        'http://localhost:81'
    ]
    if(originAry.includes(req.headers.origin)){
        //跨域 设置响应头
        res.writeHead(200,{
            'Content-Type':'text/html',
            'Access-Control-Allow-Origin':req.headers.origin
        })
    }
    const {pathname,query}=urlModel.parse(req.url);
    let lastName=['\.js$','\.css$','\.less$']
    let re=new RegExp(lastName.join('|'));
    if(pathname === '/'){
        let data=fs.readFileSync('www/index.html');
        res.end(data.toString());
    }else if(re.test(pathname)){
        // console.log(urlModel.parse(req.url));
        try{
            let data=fs.readFileSync('www'+pathname);
            res.end(data.toString());
        }catch(error){
            let data=fs.readFileSync('www/404.html');
            res.end(data.toString());
        }
    }else{
        //接口
        switch(pathname){
            case '/add':
                const {mkdirname}=qs.parse(query);
                //创建文件夹，不支持多层创建，必须清楚文件上的目录否则就会报错
                fs.mkdir('www/'+mkdirname+'/',(error)=>{
                    if(err){
                        if(err.code === 'EEXIST'){
                            //说明重名了
                            fs.readdir('www',(error,filesAry)=>{
                                console.log(filesAry)//打印当前文件夹的名称
                                let num=0;
                                let b=filesAry.includes(mkdirname);
                                let name='';
                                while(b){
                                    //重复的文件夹清除数字
                                    name=mkdirname.replace(/\(\d+)/,'');
                                    //数字重复的文件夹
                                    b=filesAry.includes(name+'('+(++num)+')');
                                    //加上顺序的数字
                                    name=name+'('+num+')';
                                }
                                fs.mkdir('www/'+name+'/',err=>{
                                    console.log('第二次创建成功了！')
                                    res.end(JSON.stringify({
                                        code:1,
                                        msg:'创建文件成功'
                                    }))
                                })
                            })
                        }
                        console.log('失败了')
                        return;
                    }
                    res.end(JSON.stringify({
                        code:1,
                        msg:'创建文件夹成功'
                    }))
                });
                break;
            case '/rename':
                if(/^post$/i.test(req.method)){
                    //post请求
                    let temp='';
                    req.on('data',d=>{
                        temp+=d;
                    });
                    req.on('end',()=>{
                        let o=qs.parse(temp.toString());
                        fs.rename('www/'+o.oldname,'www/'+o.newname,()=>{
                            res.end(JSON.stringify({
                                code:1,
                                msg:'rename success'
                            }))
                        })
                    })
                }
                break;
            case '/jsonp':
                let o=qs.parse(query.toString());
                if(o.wd === 1){
                    let json=JSON.stringify({
                        code:1,
                        ary:[1,2,3,4,5,6]
                    });
                    res.end(o.callback+'('+json2+')');
                }
                break;
            default:
                break;
        }
    }
})
let port=80;
app.listen(port);
//服务器报错会触发
app.on('error',e=>{
    if(e.code === 'EADDRINUSE'){
        port ++;
        app.listen(port)
    }
})

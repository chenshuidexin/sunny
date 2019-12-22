const http=require('http');
const fs=require('fs')
function queryString(str){
    let obj={};
    str.replace(/([^=]+)=([^&]+)&?/g,($0,$1,$2)=>{
        obj[$1]=$2;
    })
    return obj;
}
let pre=[
    {
        id:0,
        username:'王凯',
        password:123
    },
    {
        id:1,
        username:'胡歌',
        password:1234,
    },
    {
        id:2,
        username:'凯宝',
        password:4321
    }
];
http.createServer((req,res)=>{
    let url=req.url;
    if(url !== '/favicon.ico'){
        let html='';
        //post是一段一段输入，传输过程中触发的。
        req.on('data',(data)=>{
            let opt=queryString(html);
            let msg={
                code:0,
                msg:'去注册吧'
            }
            let o1=pre.find(item=>item.username === decodeURI(opt.user));
            if(o1){
                msg.code=1;
                msg.msg='有这人儿了'
            }
            res.setHeader('content-type','text/html;charset=utf-8');
            res.write(JSON.stringify(msg));
            res.end();
        })
    }else{
        try{
            if(url === '/'){
                url='/index.html';
            }
            let data=fs.readFileSync('www'+url);
            res.write(data.toString());
            res.end();
        }catch(error){
            let data=fs.readFileSync('www/404.html');
            res.write(data.toString());
            res.end();
        }
    }
}).listen(80);
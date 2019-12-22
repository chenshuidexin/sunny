const http = require('http');
const fs = require('fs');
//字段形成对象的函数eg：name=kk&age=18 -> {name:kk,age:18}
function queryString(str) {
    let obj = {};
    str.replace(/([^=]+)=([^&]+)&?/g, ($0, $1, $2) => {
        obj[$1] = $2;
    });
    return obj;
}
let pre = [
    {
        id: 0,
        user: 'kkw',
        password: 123
    },
    {
        id: 1,
        user: 'kaibao',
        password: 1234
    },
    {
        id: 2,
        user: 'lq',
        password: 0926
    }
];
http.createServer((req, res) => {
    let url = req.url;
    if (url !== '/favicon.ico') {
        if (url.includes('?')) {
            //get接口
            let ary = url.split('?');
            let jiekou = ary[0];
            //形成字段
            let opt = queryString(ary[1]);
            switch (jiekou) {
                case '/namers':
                    //返回给前端json
                    let msg = {
                        code: 0,
                        msg: "可以注册了"
                    }
                    let o1 = pre.find(item => item.user === decodeURI(opt.user))
                    if (o1) {
                        msg.code = 1;
                        msg.msg = "有了有了，不要再注册了";
                    }
                    res.setHeader('content-type', 'text/html;charset=uft-8');
                    res.write(JSON.stringify(msg))//{} -> '{}'json
                    res.end();
                    break;
                //注册接口
                case '/register':
                    let msg1 = {
                        code: 1,
                        msg: '注册之路且行且珍惜'
                    }
                    let o = pre.find(item => item.user === decodeURI(opt.user));
                    if (o) {
                        msg1.code = 0;
                        msg1.msg = '有这个人咋办？要不踢出去！'
                    } else {
                        if (opt.password) {
                            pre.push({
                                id: Date.now(),
                                user: decodeURI(opt.user),
                                password: opt.password
                            });
                        }else{
                            msg1.code=2;
                            msg1.msg='你的参数传错了';
                            res.writeHead(400,{'conyent-type':'text/html;charset-8'});
                            res.write(JSON.stringify(msg1));
                            res.end();
                            return;
                        }
                    }
                    res.setHeader('cotent-type','text/html;charset=utf-8');
                    res.write(JSON.stringify(msg1));
                    res.end();
                    break;
                defailt:
                break;
            }

        }else{
            //文件
            try{
                if(url === '/'){
                    url='/index.html';
                }
                let data=fs.readFileSync('www'+url)
                res.write(data.toString());
                res.end();
            }catch(error){
                let data=fs.readFileSync('www/404.html');
                res.write(data.toString());
                res.end();
            }
        }
    }
}).listen(80)
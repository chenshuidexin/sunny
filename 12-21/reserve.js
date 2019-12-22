const http = require('http')//自带模板块，引入即可
let app = http.createServer((res, rep) => {
    if (res.url !== "/favicon.ico") {
        let num = (/aa=(\d)/.exec(res.url.split('?')[1]))[1];

        rep.setHeader('Content-Type', 'text/html;charset=uft-8');
        if (num === '0') {
            rep.write("{'name':'kkw'}")
        } else if (num === '1') {
            rep.write("{'name':'kb'}")
        }
        rep.end();
    }
})
app.listen(80)//必须写接口，要不然不会给反应
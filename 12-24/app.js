const express = require('express');//引express框架
const fs=require('fs');//文件
const app=express();//app对象一般用来表示Express程序。通过调用Express模块导出的顶层的express()方法来创建。
const path=require('path');
const bodyParser=require('body-parser');
const session=require('express-session');
//中间件  
app.use(express.static('www'));//静态文件
/* 
 * express.static('www')
 * 是Express中唯一的内建中间件。它以server-static模块为基础开发，负责托管 Express 应用内的静态资源。 参数root为静态资源的所在的根目录。
 * 
 * app.use()中间件 
 * 
 * bodyParser.urlencoded({extended:false})
 * bodyParser.urlencoded({extended:true})
 * 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
 * 
 * 
 */
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({//配置中间项
    secret:'好烦',//随意填写字符串类型，作为服务器端的生成的session标签名
    name:'session_id',//保存在本地的cookie的一个名字，默认connect.sid  可以不设置
    cookie:{maxAge:60000},//过期时间
    resave:false,//强制保存session即使他并没有变化，建议设置为false
    saveUninitialized:true,//强制将未初始化的session进行存储
    rolling:true//刷新重置时间
}));
let sql=[
    {
        id:1,
        user:'kkwbao',
        pw:'666'
    }
];
//失焦判断用户名是否存在
const userFn=(req,res)=>{
    const {body}=req;
    let re=/^[a-zA-Z]\w{2,7}$/;
    let msgObj={};
    if(body.user&&re.test(body.user)){
        let o=sql.find(item=>item.user===body.user);
        if(o){
            msgObj.code=1;
            msgObj.msg='用户名在了';
        }else{
            msgObj.code=0;
            msgObj.msg='可以注册!';
        }
    }else{
        msgObj.msg=2;
        msgObj.msg='正确输入用户名';
    }
    res.json(msgObj);
}
//注册函数
app.post('/register',(req,res)=>{
    const {body:{user,pw}}=req;//请求体
    let re=/^[a-zA-Z]\w{2,7}$/;
    let msgObj={};
    if(user&&pw&&re.test(user)){
        let o=sql.find(item=>item.user === user);
        if(o){
            msgObj.code=1;
            msgObj.msg='用户名在了';
        }else{
            msgObj.code=0;
            msgObj.msg='你真的注册成功了';
            sql.push({
                id:Date.now(),
                user,
                pw,
            })
        }
    }else{
        msgObj.code=2;
        msgObj.msg='正确输入用户名'
    };
    res.json(msgObj);
})
//登录函数
app.post('/login',(req,res)=>{
    let msgObj={};
    const {body:{user,pw}}=req;
    if(user&&pw){
        let o=sql.find(item=>item.user === user);
        if(o){//核对密码的流程
            if(o.pw===pw){
                msgObj.code=0;
                msgObj.msg='登陆成功';
                req.session.userinfo=user;
            }else{
                msgObj.code=3;
                msgObj.msg='用户名或密码错误';
            }
        }else{
            msgObj.code=1;
            msgObj.msg='没有注册呢!'
        }
    }else{
        msgObj.code=2;
        msgObj.msg='请认真核对信息'
    }
    res.json(msgObj);
})
//判断是否登录了
app.get('/islogin',(req,res)=>{
    if(req.session.userinfo){
        res.json({
            code:0,
            msg:'欢迎回来',
            user:req.session.userinfo
        })
    }else{
        res.json({
            code:1,
            msg:'没有登陆'
        })
    }
})
//退出登录
app.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        console.log(err);
    })
    res.send({
        code:0
    })
})
//多并发
app.get('/a',(req,res)=>{
    setTimeout(()=>{
        res.json({user:'kkw'});
    },2000);
})
app.get('/b',(req,res)=>{
    setTimeout(()=>{
        res.json({iphone:'19960818'})
    },5000)
})
app.get('/c',(req,res)=>{
    let {user,iphone}=req.query
    if(user === 'kkw'&&iphone === '19960818'){
        res.json({
            code:0,
            msg:'看见了'
        })
    }else{
        res.json({
            code:1,
            msg:'还没有看到呢？'
        })
    }
})




app.use('*',(req,res)=>{
    let data=fs.readFileSync(path.resolve('./www/404.html'));
    res.send(data.toString());
})
app.listen(80);
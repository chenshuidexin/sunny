const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const session=require('express-session');
const multer=require('multer');


let sql=[
    {
        id:-1,
        name:'kb'
    },
    {
        id:0,
        name:'kkw',
        type:0
    },
    {
        id:1,
        name:'zzf',
        type:1
    },
    {
        id:2,
        name:'lq',
        type:2
    }
];

app.use(session({
    secret:'冬天里的一把火',
    name:'session_id',
    cookie:{maxAge:5000},
    resave:false,
    saveUninitialized:true
}));
app.use(express.static('www'));
app.use(multer({dest:'uploads/'}).single('filename'))
app.use('/',(req,res,next)=>{
    req.sql=sql;
    if(req.session.userinfo || req.url === '/login2'){//上面完成的时候，下面继续执行
        next();
    }else{//没有权限
        res.json({code:1111,msg:'不能进去'});
    }
});
app.use(bodyParser.json());//解决axios不能用对象的问题
app.use(bodyParser.urlencoded({extended:false}));


app.use('/login',require('./routers/user/login'));
app.use('/login2',require('./routers/user/login2'));
app.use('/getary',require('./routers/data/getary'));
app.use('/noloading',require('./routers/data/noloading'));
app.use('/upload',require('./routers/upload/upload'))
app.listen(80);
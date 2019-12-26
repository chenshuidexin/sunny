const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const multer=require('multer');
app.use(express.static('www'));
app.use(multer({dest:'uploads/'}).array('filename'))//single单个数

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/upload',require('./routers/upload/upload'));
app.listen(80);
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql=require('mysql');

var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456'
});
connection.connect(function(err){
  if(err){
    console.err('error connecting'+err.stack);
    return;
  }
  console.log('connected as id'+connection.threadId);
})

//首页以及用户主页面
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const router = require('./routes/index');
//以下为新增界面
//发送信息
var postRouter=require('./routes/post');
//注册
var regRouter=require('./routes/reg');
//登陆
var loginRouter=require('./routes/login');
//退出
var logoutRouter=require('./routes/logout');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post',postRouter);
app.use('/reg',regRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//先使用mysql过度一下，mongodb以后再说

module.exports = app;

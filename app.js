
var cookieParser = require('cookie-parser');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


//引入webpack配置文件，生成webpack编译器  [热加载]
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var compiler = webpack(webpackConfig);
//var webpackDevServer = require("webpack-dev-server");
//将编译器连接至 webpack中间件
var WebpackHotMid = require("webpack-hot-middleware");
var WebpackDevMid = require("webpack-dev-middleware");
var webpackHotMid = new WebpackHotMid(compiler);
var webpackDevMid = new WebpackDevMid(compiler, {
	publicPath: '/', 
    stats: {
	    colors: true,    
	    chunks: false  
	  }
	});
//使用中间件
app.use(webpackDevMid);
app.use(webpackHotMid);

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.engine('.html',require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/',users);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;



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
var webpackHotMid = new WebpackHotMid(compiler);  //=>require("webpack-hot-middleware")(complier)
var webpackDevMid = new WebpackDevMid(compiler, {
	publicPath: '/', 
    stats: {
	    colors: true,    
	    chunks: false  
	  }
	});

// webpack插件，监听html文件改变事件html-webpack-plugin-after-emit    htmlwebpackplugin提供
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        webpackHotMid.publish({ action: 'reload' })
        cb()
    })
})

//使用中间件
app.use(webpackDevMid);
app.use(webpackHotMid);

//获取webpack打包进内存的文件，结合路由访问
app.get('/:viewname?', function(req, res, next) {
    
    var viewname = req.params.viewname 
        ? req.params.viewname + '.html' 
        : 'index.html';
        
    var filepath = path.join(compiler.outputPath, viewname);
    
    // 使用webpack提供的outputFileSystem
    compiler.outputFileSystem.readFile(filepath, function(err, result) {
        if (err) {
            // something error
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

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

app.use('/products',users);

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


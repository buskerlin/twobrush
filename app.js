
var cookieParser = require('cookie-parser');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
//var ueditor = require('ueditor');

var index = require('./routes/index');
var users = require('./routes/users');
var manage = require('./routes/manage');
var log4js = require('./dev/log.js');

var app = express();


//引入webpack配置文件，生成webpack编译器  [热加载]
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var compiler = webpack(webpackConfig);
//var webpackDevServer = require("webpack-dev-server");
//将编译器连接至 webpack中间件
var WebpackHotMid = require("webpack-hot-middleware");
var WebpackDevMid = require("webpack-dev-middleware");
var webpackHotMid = WebpackHotMid(compiler);  //=>require("webpack-hot-middleware")(complier)
var webpackDevMid = WebpackDevMid(compiler, {
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

//使用中间件  【要获取webpack打包进内存的文件，应先注册webpackDevMid中间件】
app.use(webpackDevMid);
app.use(webpackHotMid);

//获取webpack打包进内存的文件，结合路由访问
app.get('/:viewname?', function(req, res, next) {
    
    var entry = ["","index","manage"];
    
    for(var i = 0;i < entry.length;i++){
    	var val = entry[i];
    	if(val == req.params.viewname){
    		var viewname = val == "" ? "index.html" : val + ".html";
    		break;
    	}
    	else if(i == entry.length - 1){
    		return next(); //移交到下一个中间价继续处理
    	}
    }
    
    var filepath = path.join(compiler.outputPath, viewname);
    console.log(filepath);
    // 使用webpack提供的outputFileSystem
    compiler.outputFileSystem.readFile(filepath, function(err, result) {
        if (err) {
            // something error
            console.log(err);
            //outputFileStream中不包含入口文件的其他文件 ，所以http://localhost:3001/banner03.jpg会提示不存在
            return next();
        }
        res.set('content-type', 'text/html');
        res.send(result);
        console.log(result);
        res.end();
    });
});

//注册log4js.connectLogger中间件
log4js.usemid(app);

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
app.use('/manage',manage);

//配置ueditor
//app.use("/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {  
//// ueditor 客户发起上传图片请求  
//  if(req.query.action === 'uploadimage'){  
//      var foo = req.ueditor;  
//      var date = new Date();  
//      var imgname = req.ueditor.filename;  
//
//      var img_url = '/images/ueditor/';  
//      res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做  
//  }  
////  客户端发起图片列表请求  
//  else if (req.query.action === 'listimage'){  
//      var dir_url = '/images/ueditor/';  
//      res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片  
//  }  
//// 客户端发起其它请求  
//  else {  
//
//      res.setHeader('Content-Type', 'application/json');  
//      res.redirect('/ueditor/ueditor.config.json')  
//  }
//}));

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


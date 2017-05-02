
var log4js = require('log4js');

log4js.configure({
	appenders: [
		{ type: 'console' },
		{
	        type: 'dateFile', //文件输出
	        filename: 'logs/vue',
	       	pattern: "-yyyy-MM-dd.log",
	        alwaysIncludePattern: true
//	        maxLogSize: 1024,
//	        backups:4,
//	        category: 'normal' 
	    }
	]
});

exports.getLogger = function(logName){
	var logger = log4js.getLogger(logName);
	logger.setLevel(log4js.levels.WRAN);
	//console.log(log4js.getLogger(logName).setLevel(log4js.levels.WRAN)); //undefined
	//return log4js.getLogger(logName).setLevel(log4js.levels.WRAN); 返回的不是实例化后的logger对象;
	return logger;
}

//注册中间件API
exports.usemid = function(app){
	app.use(log4js.connectLogger(this.getLogger("app"),{level:'debug', format:':method :url'}));
}

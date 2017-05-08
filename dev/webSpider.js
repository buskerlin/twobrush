 /*... Title: web spider ...*/
 /*... Author: linzi ...*/ 
 /*... Data: 2017.05.05 ...*/

var http = require("http");
var https = require("https");
var cheerio = require("cheerio");
var logger = require("./log").getLogger("webSpider.js");

var urlData = "https://www.baidu.com"; 
https.get(urlData,function(res){
	var html = '';
	res.on("data",function(chunk){
		html += chunk;
	})
	res.on("end",function(){
		//console.log(html); //html表示请求体的响应数据
		//console.log(res); res表示请求页面的响应信息，是个IncomingMessage实例
		var $ = cheerio.load(html);
		console.log($("div").length);
	});
}).on("error",function(err){
	logger("get " + urlData + "error -- " + err);
});

//处理爬到的html结构
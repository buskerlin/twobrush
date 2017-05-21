const Sequelize = require("sequelize");
const seqPool = require("../dao/sequelize");
const weiXinModel = require("../model/weiXin")(seqPool,Sequelize);

var https = require("https");
var appId = "wx4d40186bc8574aeb",
	appSecret = "a86c38ce1ac12c09e7ef35f7d09e17d4";
	
//获取access_token
var atUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret;

var getAccessToken = function(){
	return new Promise(function(resolve,reject){
		https.get(atUrl,function(res){
			var getData = '';
			res.on("data",function(data){
				getData += data;
			});
			res.on("end",function(){
				console.log(JSON.parse(getData));
				resolve(JSON.parse(getData));
			});
		});
	})
}
var getJsApiTicket = function(url){
	return new Promise(function(resolve,reject){
		https.get(url,function(res){
			var getData = '';
			res.on("data",function(data){
				getData += data;
			});
			res.on("end",function(){
				console.log(JSON.parse(getData));
				resolve(JSON.parse(getData));
			});
		});
	})
}

module.exports = function(){
	weiXinModel.findOne({where:{type:"access_token"}})
	.then(function(res){
		console.log(res);
		res = res.dataValues;
		var now = new Date().getTime();
		console.log(res);
		if(res.value == "" || now - parseInt(res.time) > 7000){
			getAccessToken().then(function(result){
				console.log();
				weiXinModel.update({
					value: result.access_token,
					time: now
				},
				{where:{type:"access_token"}});
				
				getJsApiTicket('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + result.access_token + '&type=jsapi');
			})
		}
		else{
			getJsApiTicket('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + res.access_token + '&type=jsapi')
		}
	});
//	new Promise(function(resolve,reject){
//		https.get(atUrl,function(res){
//			var getData = '';
//			res.on("data",function(data){
//				getData += data;
//			});
//			res.on("end",function(){
//				console.log(JSON.parse(getData));
//				resolve(JSON.parse(getData));
//			});
//		});
//	})
//	.then(function(access_token){
		var access_token = 'tZGfl5sbjgfh32BxJNRNgiygPENOLqKcfebh1Q3fkZULP5F5Eiss-7Vti3YcvWqKSRun_lC0xVkgyz1y_o7aaKljwDLJbt5UOWvRhJ6PrmuZwIen1PDEhF7ChnlwJfvmFVAgADAQGL';
		var jaUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi';
		https.get(jaUrl,function(res){
			getData = '';
			res.on("data",function(data){
				getData += data;
			});
			res.on("end",function(){
				console.log(JSON.parse(getData));
			});
		});
	//});
}

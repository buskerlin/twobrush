const Sequelize = require("sequelize");
const seqPool = require("../dao/sequelize");
const weiXinModel = require("../model/weiXin")(seqPool,Sequelize);
const logger = require("./log").getLogger("jsapi_ticket.js");

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
				resolve(JSON.parse(getData));
			});
		});
	})
}
var getJsApiTicket = function(access_token){
	return new Promise(function(resolve,reject){
		https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi',function(res){
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
		res = res.dataValues;
		console.log(res);
		var now = new Date().getTime();
		//未保存或已过期
		if(res.value == "" || now - res.time > 7000*1000){
			getAccessToken().then(function(result){
				weiXinModel.update({
					value: result.access_token,
					time: now
				},
				{where:{type:"access_token"}});
				
				getJsApiTicket(result.access_token).then(function(result){
					weiXinModel.update({
						value: result.ticket,
						time: now
					},
					{where:{type:"jsapi_ticket"}});
					
					logger.info("access_token已过期,重新获取成功");
				});
			})
		}
		//未过期
		else{
			weiXinModel.findOne({where:{type:"jsapi_ticket"}})
			.then(function(res){
				res = res.dataValues;
				console.log(res);
				
				logger.info("access_token未过期,查表获取jsapi_ticket成功");
			})
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
//		var access_token = 'tZGfl5sbjgfh32BxJNRNgiygPENOLqKcfebh1Q3fkZULP5F5Eiss-7Vti3YcvWqKSRun_lC0xVkgyz1y_o7aaKljwDLJbt5UOWvRhJ6PrmuZwIen1PDEhF7ChnlwJfvmFVAgADAQGL';
//		var jaUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi';
//		https.get(jaUrl,function(res){
//			getData = '';
//			res.on("data",function(data){
//				getData += data;
//			});
//			res.on("end",function(){
//				console.log(JSON.parse(getData));
//			});
//		});
	//});
}

const Sequelize = require("sequelize");
const seqPool = require("../dao/sequelize");
const weiXinModel = require("../model/weiXin")(seqPool,Sequelize);

var https = require("https");
var appId = "wx4d40186bc8574aeb",
	appSecret = "a86c38ce1ac12c09e7ef35f7d09e17d4";
	
//获取access_token
var atUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret;

module.exports = function(){
	weiXinModel.findOne({where:{type:"access_token"}})
	.then(function(res){
		console.log(res);
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

var https = require("https");
var appId = "wx4d40186bc8574aeb",
	appSecret = "a86c38ce1ac12c09e7ef35f7d09e17d4";
	
//获取access_token
var atUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret;

module.exports = function(){
	new Promise(function(resolve,reject){
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
	.then(function(access_token){
		var jaUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi';
		https.get(jaUrl,function(res){
			getData = '';
			res.on("data",function(data){
				getData += data;
			});
			res.on("end",function(){
				console.log(JSON.parse(getData));
				resolve(JSON.parse(getData));
			});
		});
	});
}

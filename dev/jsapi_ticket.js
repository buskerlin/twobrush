var https = require("https");
var appId = "wx4d40186bc8574aeb",
	appSecret = "a86c38ce1ac12c09e7ef35f7d09e17d4";
	
//获取access_token
var atUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret;

module.exports = function(){
	https.get(atUrl,function(res){
		console.log(res.body);
		var getData = '';
		res.on("data",function(data){
			getData += data;
		});
		res.on("end",function(){
			console.log(getData.parse());
		});
	});
}

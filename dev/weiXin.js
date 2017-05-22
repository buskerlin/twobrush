const Sequelize = require("sequelize");
const crypto = require('crypto');
const seqPool = require("../dao/sequelize");
const weiXinModel = require("../model/weiXin")(seqPool,Sequelize);
const logger = require("./log").getLogger("jsapi_ticket.js");

var token = "bigwoods";
var https = require("https");
var appId = "wx4d40186bc8574aeb",
	appSecret = "a86c38ce1ac12c09e7ef35f7d09e17d4";
	
//获取access_token
var atUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret;

var getAccessTokenUrl = function(){
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
var getJsApiTicketUrl = function(access_token){
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
var getJsApiTicket = function(){
	return Promise(function(reslove,reject){
		weiXinModel.findOne({where:{type:"access_token"}})
		.then(function(res){
			res = res.dataValues;
			console.log(res);
			var now = new Date().getTime();
			//未保存或已过期
			if(res.value == "" || now - res.time > 7000*1000){
				getAccessTokenUrl().then(function(result){
					weiXinModel.update({
						value: result.access_token,
						time: now
					},
					{where:{type:"access_token"}});
					
					getJsApiTicketUrl(result.access_token).then(function(result){
						weiXinModel.update({
							value: result.ticket,
							time: now
						},
						{where:{type:"jsapi_ticket"}});
						
						reslove(result.ticket);
						logger.info("access_token已过期,重新获取成功");
					});
				})
			}
			//未过期
			else{
				weiXinModel.findOne({where:{type:"jsapi_ticket"}})
				.then(function(res){
					res = res.dataValues;
					
					reslove(res.jsapi_ticket);
					logger.info("access_token未过期,查表获取jsapi_ticket成功");
				})
			}
		});
	});
}

module.exports = {
	//与微信服务器建立通信
	connectWX(req,res,next){
		var signature = req.query.signature;
	    var timestamp = req.query.timestamp;
	    var nonce = req.query.nonce;
	    var echostr = req.query.echostr;
	  
	    /*  加密/校验流程如下： */
	    //1. 将token、timestamp、nonce三个参数进行字典序排序
	    var arr = new Array(token,timestamp,nonce);
	    arr.sort();
	    var str = arr.join("");
	  
	    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
	    var sha1Code = crypto.createHash("sha1");
	    var code = sha1Code.update(str,'utf-8').digest("hex");
	  
	    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
	    if(code===signature){
	        res.send(echostr);
	        logger.error(echostr);
	    }else{
	        res.send("error");
	    }
	},
	//获取access_token和jsapi_ticket并将配置参数发送前端
	getSDKParams(req,res,next){
		getJsApiTicket().then(function(ticket){
			logger.error(ticket);
		});
	}
}
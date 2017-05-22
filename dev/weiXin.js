const Sequelize = require("sequelize");
const crypto = require('crypto');
const seqPool = require("../dao/sequelize");
const weiXinModel = require("../model/weiXin")(seqPool,Sequelize);
const logger = require("./log").getLogger("weiXin.js");

var token = "bigwoods";
var https = require("https");
var appId = "wx4d40186bc8574aeb",
	appSecret = "a86c38ce1ac12c09e7ef35f7d09e17d4";
	
//获取access_token
var atUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret;

var getAccessTokenUrl = function(){
	return new Promise(function(resolve,reject){
		https.get(atUrl,function(result){
			var getData = '';
			result.on("data",function(data){
				getData += data;
			});
			result.on("end",function(){
				resolve(JSON.parse(getData));
			});
		});
	})
}
var getJsApiTicketUrl = function(access_token){
	return new Promise(function(resolve,reject){
		https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi',function(result){
			var getData = '';
			result.on("data",function(data){
				getData += data;
			});
			result.on("end",function(){
				console.log(JSON.parse(getData));
				resolve(JSON.parse(getData));
			});
		});
	})
}
var getJsApiTicket = function(){
	return new Promise(function(resolve,reject){
		weiXinModel.findOne({where:{type:"access_token"}})
		.then(function(result){
			result = result.dataValues;
			console.log(result);
			var now = new Date().getTime();
			//未保存或已过期
			if(result.value == "" || now - result.time > 7000*1000){
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
						
						resolve(result.ticket);
						logger.info("access_token已过期,重新获取成功");
					});
				})
			}
			//未过期
			else{
				weiXinModel.findOne({where:{type:"jsapi_ticket"}})
				.then(function(result){
					result = result.dataValues;
					
					resolve(result.value);
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
			
			var datas = {
				noncestr: Math.random().toString(36).substr(2, 15),
		        timestamp: Date.now().toString().slice(-10),
		        url: req.body.url,
		        jsapi_ticket: ticket
			}
	        /*  加密/校验流程如下： */
		    //1. 将token、timestamp、nonce三个参数进行字典序排序
		  	var keySort = ['jsapi_ticket', 'timestamp', 'noncestr', 'url'].sort();
	        var str = '';
	        keySort.forEach(function(val,index){
	        	str += val + "=" + datas[val] + "&";
	        });
	        str = str.slice(0, -1);
	       	// var signature = sha1(str)
		   	console.log(str);
		    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
		    var sha1Code = crypto.createHash("sha1");
		    var signature = sha1Code.update(str,'utf-8').digest("hex");
		    var data = {
		            noncestr: noncestr,
		            signature: signature
		    }
			console.log(data);
	        res.json({
	        	code: 1, 
	        	data: {
		            appId: appId,
		            timestamp: timestamp,
		            noncestr: noncestr,
		            signature: signature
		        }
	        })

		});
	}
}
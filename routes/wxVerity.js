var express = require('express');
var router = express.Router();
var wx = require('../dev/weiXin.js');
var logger = require('../dev/log.js').getLogger("wxVerity.js");

router.get("/verity",function(req,res,next){
	wx.connectWX(req,res,next);
});

router.post("/getSDKParams",function(req,res,next){
	wx.getSDKParams(req,res,next);
});

module.exports = router;
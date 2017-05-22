var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var wx = require('../dev/weixin.js');
var logger = require('../dev/log.js').getLogger("wxVerity.js");
  
var token = "bigwoods";

router.post("/verity",function(req,res,next){
	wx.connectWX(req,res,next);
});

router.post("/getSDKParams",function(req,res,next){
	wx.getSDKParams(req,res,next);
});

module.exports = router;
var express = require('express');
var router = express.Router();
var manageDb = require("../dao/operateDB.manage");
var acceptUpload = require("../dev/acceptUpload.js");

router.post("/getProductsType",function(req,res,next){
	manageDb.getProductsType(req,res,next);
});

//获取上传的图片
router.post("/uploadImgs",function(req,res,next){
	acceptUpload.handleImg(req,res,next); 
});

module.exports = router;

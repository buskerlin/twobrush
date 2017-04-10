const express = require('express');
const router = express.Router();
const userSql = require("../dao/operateDB");

/*..获取首页列表..*/
router.get("/",function(req,res){
	//为什么进不来这个回调呢
	console.log("000000000000000");
	res.send({code:0});
});

router.get("/getListData",function(req,res,next){
	userSql.getListData(req,res,next);
});

router.get("/getDetails",function(req,res,next){
	userSql.getDetails(req,res,next);
});

module.exports = router;

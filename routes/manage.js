var express = require('express');
var router = express.Router();
var manageDb = require("../dao/operateDB.manage");

router.post("/getProductsType",function(req,res,next){
	manageDb.getProductsType(req,res,next);
});

module.exports = router;

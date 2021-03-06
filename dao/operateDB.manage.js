const logger = require("../dev/log.js").getLogger("opreateDB.manage.js");
const Sequelize = require("sequelize");
const seqPool = require("./sequelize");
const brushTypeModel = require("../model/brushType");
const productsModel = require("../model/products");

//是exports而不是export
module.exports = {
	//获取产品种类
	getProductsType(req,res,next){
		brushTypeModel(seqPool,Sequelize).findAll({
			attributes: ["name","brush_code"]
		}).then(function(result){
			res.json(result);
		}).catch(function(err){
			logger.error("getProductsType--" + err);
		});
	},
	//新增产品
	uploadProduct(postData,res,next){
		
		//set dafaults
		postData.prizeMin = postData.prizeMin ? postData.prizeMin : "1";
		postData.prizeMax = postData.prizeMax ? postData.prizeMax : "100";
		postData.thumbs = postData.thumbs ? postData.thumbs : parseInt(Math.random()*200);
		postData.pv = postData.pv ? postData.pv : parseInt(Math.random()*200);
		
		productsModel(seqPool,Sequelize).create(postData)
			.then(function(result){
				res.json({
					code: 1,
					msg: "新增信息成功"
				});
			}).catch(function(err){
				res.json(err);
				logger.error("uploadProduct -- " + err);
			});
	}
}


const Sequelize = require("sequelize");
const seqPool = require("./sequelize");
const brushTypeModel = require("../model/brushType");
const logger = require("../dev/log.js").getLogger("opreateDB.manage.js");

//是exports而不是export
module.exports = {
	getProductsType(req,res,next){
		brushTypeModel(seqPool,Sequelize).findAll({
			attributes: ["name","brush_code"]
		}).then(function(result){
			res.json(result);
		}).catch(function(err){
			logger.error("getProductsType--" + err);
		});
	}
}

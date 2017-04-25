
const Sequelize = require("sequelize");
const seqPool = require("./sequelize");
const brushTypeModel = require("../model/brushType");

//是exports而不是export
module.exports = {
	getProductsType(req,res,next){
		brushTypeModel(seqPool,Sequelize).findAll({
			attributes: ["name","brush_code"]
		}).then(function(result){
			res.json(result);
		}).catch(function(err){
			console.error(err);
		});
	}
}

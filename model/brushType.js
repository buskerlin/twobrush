var weiXin = function(sequelize,dataTypes){
	return sequelize.define("weixin",{
		type:{
			type: dataTypes.STRING,
			allowNull: false,
			autoIncrement: false,
			primaryKet: false
		},
		value:{
			type: dataTypes.STRING,
			allowNull: false,
			autoIncrement: false,
			primaryKet: false
		},
		time:{
			type: dataTypes.STRING,
			allowNull: false,
			autoIncrement: false,
			primaryKet: false
		}
	},{
		tableName: "weixin",
		timestamps: false
	});
}

module.exports = weiXin;
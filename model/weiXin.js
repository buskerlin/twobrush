var weiXin = function(sequelize,dataTypes){
	return sequelize.define("weixin",{
		id:{
			type: dataTypes.STRING,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		type:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		value:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		time:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		}
	},{
		tableName: "weixin",
		timestamps: false
	});
}

module.exports = weiXin;
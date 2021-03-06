var brushType = function(sequelize,dataTypes){
	return sequelize.define("brush_type",{
		id:{
			type: dataTypes.STRING,
			allowNull: false,
		    autoIncrement: true,
		    primaryKey: true
		},
		name:{
			type: dataTypes.STRING,
			allowNull: false,
			autoIncrement: false,
			primaryKey: false
		},
		brushCode:{
			type: dataTypes.STRING,
			allowNull: false,
			autoIncrement: false,
			primaryKey: false,
			field: "brush_code"
		}
	},{
		tableName: "brush_type",
		timestamps: false
	});
}

module.exports = brushType;
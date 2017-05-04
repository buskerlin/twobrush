var products = function(sequelize,dataTypes){
	return sequelize.define("products",{
		id:{
			type: dataTypes.STRING,
			allowNull: false,
		    autoIncrement: true,
		    primaryKey: true
		},
		pv:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKet: false
		},
		cover:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKet: false
		},
		name:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKet: false
		},
		desc:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKet: false
		},
		brush_code:{
			type: dataTypes.STRING,
			allowNull: false,
			autoIncrement: false,
			primaryKet: false
		},
		prizeMax:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKet: false
		},
		prizeMin:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKet: false
		},
		thumbs:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKet: false
		},
		remarks:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKet: false
		},
		material:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKet: false
		},
		title:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKet: false
		},
		benefit:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKet: false
		},
		carousel:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKet: false
		}
	},{
		tableName: "products",
		timestamps: false
	});
}

module.exports = products;
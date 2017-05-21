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
			primaryKey: false
		},
		cover:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		name:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		desc:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		brush_code:{
			type: dataTypes.STRING,
			allowNull: false,
			autoIncrement: false,
			primaryKey: false
		},
		prizeMax:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		prizeMin:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		thumbs:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		remarks:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		material:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		title:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		benefit:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		carousel:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		},
		subfile_dir:{
			type: dataTypes.STRING,
			allowNull: true,
			autoIncrement: false,
			primaryKey: false
		}
	},{
		tableName: "products",
		timestamps: false
	});
}

module.exports = products;

const mySql = require("mysql");
const sqlConfig = require("./sqlConfig");
const sql = require("./sql");

//创建连接池
var pool = mySql.createPool(sqlConfig.mySql);

//是exports而不是export
module.exports = {
	getListData: function(req,res,next){
		pool.getConnection(function(err,connection){
			connection.query(sql.queryPart,function(err,result){
				if(err){
					throw err;
				}
				res.json(result);
				connection.release();
			});
		})
	},
	getDetails: function(req,res,next){
		var id = req.query.id;
		pool.getConnection(function(err,connection){
			connection.query(sql.queryById,id,function(err,result){
				if(err){
					throw err;
				}
				console.log(result);
				res.json(result);
				connection.release();
			});
		});
	}
}

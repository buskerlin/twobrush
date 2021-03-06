
const mySql = require("mysql");
const sqlConfig = require("./sqlConfig");
const sql = require("./sql");
const common = require("./common.js");

//创建连接池
var pool = mySql.createPool(sqlConfig.mySql);

module.exports = {
	getListData(req,res,next){
		pool.getConnection(function(err,connection){
			console.log(err);
			connection.query(sql.queryPart,function(err,result){
				if(err){
					throw err;
				}
				res.json(result);
				connection.release();
			});
		})
	},
	getDetails(req,res,next){
		var id = req.body.id;
		pool.getConnection(function(err,connection){
			connection.query(sql.queryById,[id,id],function(err,result){
				if(err){
					throw err;
				}
				res.json(common.jointData(["pid","remark"],result,"remarks"));
				connection.release();
			});
		});
	},
	addThumb(req,res,next){
		var id = req.body.id;
		pool.getConnection(function(err,connection){
			connection.query(sql.addThumb,id,function(err,result){
				if(err){
					throw err;
				}
				//mysql同时只能允许一个操作，故update后再select
				connection.query(sql.queryThumb,id,function(err,result){
					if(err){
						throw err;
					}
					res.json(result[0]);
					connection.release();
				});
			});
		});
	},
	leaveMessage(req,res,next){
		pool.getConnection(function(err,connection){
			connection.query(sql.leaveMessage,[req.body.remark,req.body.id],function(err,result){
				if(err){
					throw err;
				}
				connection.query(sql.queryMessage,req.body.id,function(err,result){
					if(err){
						throw err;
					}
					res.json(result);
					connection.release();
				});
			});
		});
	}
}

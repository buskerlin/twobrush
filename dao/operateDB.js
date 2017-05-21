
const mySql = require("mysql");
const sqlConfig = require("./sqlConfig");
const sql = require("./sql");
const common = require("./common.js");

//创建连接池
var pool = mySql.createPool(sqlConfig.mySql);

//是exports而不是export
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
	},
	//获取access_token和jsapi_ticket
//	matchToken(req,res,next){
//		var type = req.body.type,
//			time = req.body.time;
//		pool.getConnection(function(err,connection){
//			return new Promise(function(reslove,reject){
//				connection.query(sql.queryToken,type,function(err,result){
//					if(err){
//						throw err;
//					}
//					//第一次保存||已过期
//					if(result.val == "" || ){
//						
//					}
//				});
//			})
//			.then(function(){
//				
//			});
//			
//				
//				//mysql同时只能允许一个操作，故update后再select
//				connection.query(sql.queryThumb,id,function(err,result){
//					if(err){
//						throw err;
//					}
//					res.json(result[0]);
//					connection.release();
//				});
//			
//		});
//	}
}

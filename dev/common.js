"use strict";
var fs = require("fs");
var logger = require("./log").getLogger("dev/common.js");

var $common = {
	//生成多层文件夹 [callback(type):type=0表示有新文件夹生成，type=1表示无新文件夹生成，即路径已存在]
	mkdirs(path,callback){
		//先判断路径是否存在
		fs.stat(path,function(err,stats){
			if(err){
				var current = "";
				path.split("/").forEach(function(val,index,array){
					current = current + val + "/";
					//let:块级作用域，可保存变量状态
					let currentPath = current;
					console.time("stat");
					console.time("forEach");
					fs.stat(currentPath,function(err,stats){
						console.timeEnd("stat");
						let mkdirPath = currentPath;
						if(err){
							fs.mkdir(mkdirPath,function(err){
								if(err){
									logger.error("mkdir err -- " + err);
								}
								else if(array.length == index + 1){
									logger.info("mkdir success -- " + currentPath);
									callback("0");
								}
							});
						}
					});
				});
				console.timeEnd("forEach");
			}
			else{
				callback("1");
			}
		});
	}
}
module.exports = $common;

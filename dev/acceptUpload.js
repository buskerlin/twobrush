var fs = require("fs");
var formidable = require("formidable");
var form = new formidable.IncomingForm();
var logger = require("../dev/log.js").getLogger("acceptUpload.js");

//存储目录
form.uploadDir = './public/img/carousel/';

module.exports = {
	handleImg: function(req, res, next) {
		var parseTimes = true;
		//fields:前端提交的字段；files:前端提交的文件
	    form.parse(req, function(err, fields, files) {
	    	
	    	if(!parseTimes)return;  //使用element-ui的上传组件时，当提交第二(N)张图时，form.parse()会执行二(N)次，应该是upload组件提交了重复信息
	    	
	    	parseTimes = false;
	        if (err) {
	            console.log(err);
	          	return res.json(0);        
	        }
	        
	        //处理获取到的文件
	        for (var key in files) {
	            console.log(files[key].path);
	            console.log(key);
	            var extName = files[key].type.indexOf("jpeg") > -1 ? "jpeg"
	            			  : files[key].type.indexOf("png") > -1 ? "png"
	            			  : false;
				if(!extName){
					logger.error("handleImg-- image type error");
					return res.json({
						code: "0",
						msg: "image type error"
					});
				}
				
				var imgPath = form.uploadDir + fields.dirCode + "/",
					avatarName = (new Date()).getTime() + '.' + extName,
					newPath = imgPath + avatarName;
				//新版本中fs.exists()被废弃
		        fs.stat(imgPath,function(err,stat){
		        	if(err){
		        		fs.mkdir(imgPath,function(err){
		        			if(err){
		        				logger.error("mkdir err -- " + err);
		        			}
		        			else{
				        		logger.info("mkdir /" + fields.dirCode + " success");
				        	}
		        		});
		        	}
		        	//重命名并把文件放到指定文件夹newPath
		        	logger.info("start move to /" + fields.dirCode + " [sync]");
		        	fs.renameSync(files[key].path, newPath);
		        })
	            
	            //移动文件并重命名
//	            var oldFile = fs.createReadStream(files[key].path);
//	            var newFile = fs.createWriteStream(newPath);
//	            oldFile.pipe(newFile);
//	            newFile.on("end",function(){
//	            	logger.info("copy img success");
//	            });
	            
	            //这里的form.parse()只执行一次，所以res.json()可以写在函数内部【一次请求只能response一次】
	            res.json({
	            	data:newPath
	            });
	        }
	    });
	}
}

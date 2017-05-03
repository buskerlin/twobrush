var fs = require("fs");
var formidable = require("formidable");
var form = new formidable.IncomingForm();
var logger = require("../dev/log.js").getLogger("acceptUpload.js");

//临时目录
form.uploadDir = './public/img/upload/';

module.exports = {
	handleImg: function(req, res, next) {
		var parseTimes = true;
	    form.parse(req, function(err, fields, files) {
	    	
	    	if(!parseTimes)return;  //使用element-ui的上传组件时，当提交第二(N)张图时，form.parse()会执行二(N)次，应该是upload组件提交了重复信息
	    	
	    	parseTimes = false;
	        if (err) {
	            console.log(err);
	          	return res.json(0);        
	        }
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
	            var avatarName = (new Date()).getTime() + '.' + extName;
	            var newPath = form.uploadDir + avatarName;
	            
	            fs.renameSync(files[key].path, newPath); //重命名
	            //这里的form.parse()只执行一次，所以res.json()可以写在函数内部【一次请求只能response一次】
	            res.json({
	            	data:newPath
	            });
	        }
	    });
	}
}

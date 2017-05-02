var fs = require("fs");
var formidable = require("formidable");
var form = new formidable.IncomingForm();
var logger = require("../dev/log.js").getLogger("acceptUpload.js");

//临时目录
form.uploadDir = './public/img/upload/';

module.exports = {
	
	handleImg: function(req, res, next) {
	    form.parse(req, function(err, fields, files) {
	        console.log(files);
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
					res.json({
						code: "0",
						msg: "image type error"
					});
					return;
				}
	            var avatarName = (new Date()).getTime() + '.' + extName;
	            var newPath = form.uploadDir + avatarName;
	            
	            fs.renameSync(files[key].path, newPath); //重命名
	            res.json("/upload/temp/"+ avatarName);
	        }
	    });
	}
}

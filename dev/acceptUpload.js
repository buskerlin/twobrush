var fs = require("fs");
var manageDb = require("../dao/operateDB.manage");
var formidable = require("formidable");
var form = new formidable.IncomingForm();
var logger = require("../dev/log").getLogger("acceptUpload.js");
var $common = require("./common");

//存储目录
var sqlPath = '/img/carousel/';
form.uploadDir = './public/img/carousel/';

var productImgPath = {cover: "",carousel: ""};
module.exports = {
	handleImg: function(req, res, next) {
		
		var parseTimes = true;
		//fields:前端提交的字段；files:前端提交的文件
	    form.parse(req, function(err, fields, files) {
	    	console.log(fields);
	    	if(!parseTimes)return;  //使用element-ui的上传组件时，当提交第二(N)张图时，form.parse()会执行二(N)次，应该是upload组件提交了重复信息
	    	
	    	parseTimes = false;
	        if (err) {
	            console.log(err);
	          	return res.json(0);        
	        }
	        
	        //处理获取到的文件
	        for (var key in files) {
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
				
				var imgPath = form.uploadDir + fields.brush_code + "/" + fields.subfile_dir,
					avatarName = (new Date()).getTime() + '.' + extName,
					newPath = imgPath + "/" + avatarName;
				
				//存储到database的图片路径
				if(fields.type == "cover"){
					productImgPath.cover = sqlPath + fields.brush_code + "/" + fields.subfile_dir + "/" + avatarName + ",";
				}
				else{
					productImgPath.carousel += sqlPath + fields.brush_code + "/" + fields.subfile_dir + "/" + avatarName + ",";	
				}
				//mkdir多层文件夹[新版本中fs.exists()被废弃]
				$common.mkdirs(imgPath,function(type){
					fs.renameSync(files[key].path, newPath);
				});
	            //这里的form.parse()只执行一次，所以res.json()可以写在函数内部【一次请求只能response一次】
	            res.json('Image upload success,but the path has not yet save to mysql');
	            return;
	        }
	        
	        //上传所有字段到数据库
	        //if(productImgPath.carousel.match(/,/g).length > 1){}
	        productImgPath.carousel = productImgPath.carousel.slice(0,productImgPath.carousel.length-1); //去除字符串末尾的逗号
	        productImgPath.cover = productImgPath.carousel.slice(0,productImgPath.carousel.length-1); //去除字符串末尾的逗号
	        manageDb.uploadProduct(Object.assign(fields,productImgPath),res,next);
	    });
	}
}

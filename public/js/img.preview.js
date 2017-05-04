/*.... 移动端图片提交预览插件 ....*/
/*.... author:林子大了 ....*/
/*.... ver:2016.09.09 ....*/

/*.. [original:按图片的原始比例显示，图片可能会有局部无法显示,compress:将图片以设定好的宽高比进行显示，图片可能会有压缩] ..*/
/*.. [true:显示抖动动画,false:删除抖动动画] ..*/
/*.. [inputId:当前可添加图片的input元素的id] ..*/
/*.. [initial:初始状态的图片数组 ..*/

var Preview = function(param){
	
	var defaultSet = {
		boxId: "body",
		animation: "true",
		imgStyle: "original",
		maxWidth: 400,
		ratio: 0.8,
		imgNums: 5,
		initial:[],
		callback:function(){
			console.log("callback");
		}
	};
	var _this = this;
	var htmlInit,htmlAdd,rotateEvent=false,parsent,imgNums=0;
	
	this.changeStatue = true;
	this.imgBase64Bak = []; //压缩过后的,原始数据
	this.imgBase64 = []; //重新排序，封面图置首
	this.imgType = null;
	this.coverIndex = 0;
	this.show = function(param,num){
		if(arguments.length == 1){
			document.querySelector(param).style.display = "block";
		}
		else{
			document.querySelectorAll(param)[num].style.display = "block";
		}
	}
	this.hide = function(param,num){
		if(arguments.length == 1){
			document.querySelector(param).style.display = "none";
		}
		else{
			document.querySelectorAll(param)[num].style.display = "none";
		}
	}
	
	for(var i in param){
		defaultSet[i] = param[i];
	}
	
	if(typeof this.init != "function"){
		
		//初始化
		this.init = function(){
			
			if(defaultSet.boxId == "body"){
				parsent = document.body;
			}
			else{
				parsent = document.getElementById(defaultSet.boxId);
			}
			
			_this.addImg(parsent);
			
			//<input type="file">绑定的onchange事件只能被触发一次
			//解决方法：第一次onchange被触发时，移除该input元素，并重新生成
			document.querySelector("#add-img").onchange = function(){
				
				_this.addImg(parsent,0);
			}
			
		};
		
		//添加图片
		this.addImg = function(parsent,add){
			
			if(imgNums == defaultSet.imgNums){
				alert("您最多只能上传四张照片额");
				return;
			}
			
			htmlAdd = "<div class='img-box'>\
							<input type='hidden' class='show-value'/>\
							<img class='show-img'/>\
							<ul class='deleteBox'>\
								<li class='deleteShape bw-button-small'>删除</li>\
								<li class='setMainImg bw-button-small'>设为封面</li>\
							</ul>\
							<span class='choose-cover'>封面</span>\
						</div>";
			
			//console.log(arguments.length);
			switch(arguments.length){
				//初始态
				case 1:
					htmlInit = "<div class='input-box'><input type='file' id='add-img' accept='image/jpeg,image/jpg,image/png' capture='camera'/><div class='add-img'>+</div></div>"
					parsent.innerHTML = parsent.innerHTML + htmlInit;
					
					_this.setInitial();
					break;
				//开始添加
				case 2:
				
					$(".loadShape").show();
					_this.changeStatue = true;
					
					var fileReader = new FileReader();
					var deg = 0;
					
					fileReader.onload = function(e){
						
							
							console.log(deg);
							
							//alert("2"+_this.imgOrientatio);
						
							var imgUrl = e.target.result;
							
							//移除input-box并重新生成
							parsent.removeChild(document.querySelector(".input-box"));
							parsent.innerHTML = parsent.innerHTML + htmlAdd + htmlInit;
							
							//将图片信息保存到表单
							_this.last(".show-value").value = imgUrl;
							_this.last(".show-img").src = imgUrl;
							
							//添加标记
							_this.last(".show-img").setAttribute("sign",imgNums);
							_this.last(".deleteShape").setAttribute("sign",imgNums);
							_this.last(".deleteBox").setAttribute("sign",imgNums);
							_this.last(".choose-cover").setAttribute("sign",imgNums);
							imgNums++;
							
							//添加删除事件
							var boxImgs = document.querySelectorAll(".img-box");
							var showImgs = document.querySelectorAll(".show-img");
							for(var i = 0;i < showImgs.length;i++){
								_this.deleteImg(boxImgs[i],showImgs[i]);	
							}
							
							//压缩
							_this.last(".show-img").onload = function(){
								if(_this.changeStatue){
									$(".loadShape").hide();
								
									_this.compress(_this.last(".show-img"),defaultSet.maxWidth,defaultSet.ratio);
									
									//由于之前绑定的#add-img元素已经删除，故要给重新生成的#add-img再绑定一次
									document.querySelector("#add-img").onchange = function(){
										_this.addImg(parsent,0);
									}
									
									$(".setMainImg").click(function(e){
										e.stopPropagation();
										_this.setCover($(this).parent().attr("sign"));
									});
									
									//回调
									defaultSet.callback();	
									
									if(imgNums == defaultSet.imgNums){
										$(".input-box").hide();
									}
									else{
										$(".input-box").show();	
									}	
								}
								
								_this.changeStatue = false;
							}
					}
					

					fileReader.readAsDataURL(document.querySelector("#add-img").files[0]);
					
					var fileName = document.querySelector("#add-img").files[0].name;
					console.log(document.querySelector("#add-img").files[0].name);
						
					//获取文件后缀名
					var nameStr = fileName.split(".");
					_this.imgType = nameStr[nameStr.length - 1];
					console.log(_this.imgType);
					
					break;
			}
		};
		
		//设置初始图片
		this.setInitial = function(){
			for(var j = 0;j < defaultSet.initial.length;j++){
				console.log(defaultSet.initial);
				parsent.removeChild(document.querySelector(".input-box"));
				parsent.innerHTML = parsent.innerHTML + htmlAdd + htmlInit;
				//将图片信息保存到表单
				_this.last(".show-value").value = defaultSet.initial[j];
				_this.last(".show-img").src = defaultSet.initial[j];
				
				//添加标记
				_this.last(".show-img").setAttribute("sign",imgNums);
				_this.last(".deleteShape").setAttribute("sign",imgNums);
				_this.last(".deleteBox").setAttribute("sign",imgNums);
				_this.last(".choose-cover").setAttribute("sign",imgNums);
				imgNums++;
				
				_this.compress(_this.last(".show-img"),defaultSet.maxWidth,1);
			}
			
			
			//添加删除事件
			var boxImgs = document.querySelectorAll(".img-box");
			var showImgs = document.querySelectorAll(".show-img");
			for(var i = 0;i < showImgs.length;i++){
				_this.deleteImg(boxImgs[i],showImgs[i]);	
			}
			
			//设置封面
			$(".setMainImg").click(function(e){
				e.stopPropagation();
				_this.setCover($(this).parent().attr("sign"));
			});
		}
		
		//设置封面
		this.setCover = function(param){
			_this.coverIndex = param;
			$(".choose-cover").hide();
			$(".choose-cover").eq(param).show();
			
			//封面图置首
			console.log(_this.imgBase64Bak);
//			_this.imgBase64 = _this.imgBase64Bak;
			_this.imgBase64.splice(param,1);
			console.log(_this.imgBase64);
			_this.imgBase64.unshift(_this.imgBase64Bak[param]);
			console.log(_this.imgBase64);
			
			//回调
			defaultSet.callback();
		}
		
		//图片压缩  [ios下图片会被翻转]
		this.compress = function(img,maxWidth,ratio){
			
			//新建canvas
			var size = {w:null,h:null};
			
			//获取图片原始宽高(img.width标识的是img元素的css的值)
			var imgBak = new Image();
			imgBak.src = img.src;
			
			imgBak.onload = function(){
				if(imgBak.width > maxWidth){
					size.w = maxWidth;
					size.h = imgBak.height / imgBak.width * maxWidth;
				}
				else{
					size.w = imgBak.width;
					size.h = imgBak.height;
				}
				console.log(imgBak.width);
				
				var canvas = document.createElement("canvas");
				var con = canvas.getContext("2d");
				con.clearRect(0,0,size.w,size.h);
				canvas.width = size.w;
				canvas.height = size.h;
				//con.rotate(rotateDeg*Math.PI/180);
				con.drawImage(imgBak,0,0,size.w,size.h);
				
				//新建img,承载压缩后的图片
				//var compressImg = new Image();
				//compressImg.src = con.toDataURL("image/jpeg","0.6");
				img.src = canvas.toDataURL("image/jpeg",ratio);
				
				_this.imgBase64Bak.push(canvas.toDataURL("image/jpeg",ratio));
				_this.imgBase64.push(canvas.toDataURL("image/jpeg",ratio));
				console.log("5566:"+_this.imgBase64.length);
				
				//设置表单的初始值
				$("#coverMsg").val(_this.imgBase64);
			}
		}; 
		
		//放大显示/移除图片
		this.imgView = function(imgs,index){
			
		};
		
		//获取相同class元素集合的最后一个
		this.last = function(className){
			var eles = document.querySelectorAll(className);
			return eles[eles.length - 1];
		};
		
		
		//删除图片 设置封面
		this.deleteImg = function(imgObx,img){
			
			var index = img.getAttribute("sign");
			
			//已事件监听的形式绑定元素,在进行 parsent.innerHTML = parsent.innerHTML + htmlAdd + htmlInit 操作时已绑定的事件失效 
			imgObx.addEventListener("mouseover",function(e){
				e.preventDefault();
				e.stopPropagation();
				
				$(".deleteBox").eq(index).show();
			});
			
			imgObx.addEventListener("mouseleave",function(e){
				e.preventDefault();
				e.stopPropagation();
				
				$(".deleteBox").eq(index).hide();
			});
			
			var deleteImg =  $(imgObx).find(".deleteShape");
			deleteImg.click(function(e){
				
				var indexBak = this.getAttribute("sign");
				
				$(".input-box").show();
				
				e.stopPropagation();
				$(imgObx).remove();
				imgNums--;
				
				//一并删除this.imgBase64Bak中对应的值
				_this.imgBase64Bak.splice(indexBak,1);
				
				//删除后将所有 deleteShape的sign进行重排
				var tags01 = document.querySelectorAll(".show-img");
				var tags02 = document.querySelectorAll(".deleteShape");
				var tags03 = document.querySelectorAll(".deleteBox");
				var tags04 = document.querySelectorAll(".deleteBox");
				for(var i = 0;i < tags01.length;i++){
					tags01[i].setAttribute("sign",i);
					tags02[i].setAttribute("sign",i);
					tags03[i].setAttribute("sign",i);
					tags04[i].setAttribute("sign",i);
				}
				
				if(indexBak == _this.coverIndex){
					//封面图置首
					$(".choose-cover").eq(0).show();
					_this.imgBase64.splice(indexBak,1);
				}
				else if(indexBak > _this.coverIndex){
					_this.imgBase64.splice(indexBak,1);
				}
				else{
					_this.imgBase64.splice(indexBak + 1,1);
				}
				
				//回调
				defaultSet.callback();
			});
		}
		
		//start
		this.init();
	}
}
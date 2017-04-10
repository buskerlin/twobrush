/*.................
 * author: linzi
 * title: loadMedia 
 * version: 2016.03.10-0.1
 * Linzi personal website: www.bigwoods.cn
 
 * 说明：判断网站媒体资源是否加载完成  img/video/audio，适用于 >=IE9及其他内核浏览器
 .................*/

window.loadMedia = function(setParam){
	
	var defaultSet = {
		img: true,
		audio: true,
		vedio: false,
		parent: "body", //在某个父元素下查找媒体文件
		scaleEle: "body",
		scaleShow: false,
		minTime: 600, //默认执行最短时间，防止加载时间过短造成loading遮罩出现后立马消失视觉上出现闪屏
		loadComplete: function(){
			alert("加载完成");
		}
	};
	
	for(var i in setParam){
		defaultSet[i] = setParam[i];
	}
	
	defaultSet.parent = defaultSet.parent == "body" ? document.body : document.querySelector(defaultSet.parent);
	var media = {
		imgs: defaultSet.parent.querySelectorAll("img"),
		audios: defaultSet.parent.querySelectorAll("audio"),
		vedios: defaultSet.parent.querySelectorAll("vedio")
	};
	for(var i in defaultSet){
		if(i == "img" || i == "audio" || i == "video"){
			if(defaultSet[i]){
				defaultSet[i] = 1;
			}
			else{
				defaultSet[i] = 0;
			}
		}
	}
	console.log(this);
	this.scale = null;
	this.length = null; //当前还剩多少个资源没被加载
	
	if(defaultSet.scaleEle == "body" && defaultSet.scaleShow){
		var _div = document.createElement("div");
		document.body.appendChild(_div);
		_div.innerHTML = this.scale;
	}
	
	var _this = this;
	
	this.count = function(){
		//
		if(this.support()){
			if(defaultSet["audio"] == 1){
				for(var i = 0;i < media.audios.length;i++){
					media.audios[i].onloadedmetadata = function(){
						//this.length--; 这里的this指向media.audios[i]
						_this.length--;
					}
				}	
			}
			
			if(defaultSet["vedio"] == 1){
				for(var i = 0;i < media.vedios.length;i++){
					media.vedios[i].onloadedmetadata = function(){
						_this.length--;
					}
				}	
			}
			
			if(defaultSet["img"] == 1){
				for(var i = 0;i < media.imgs.length;i++){
					if(media.imgs[i].complete){
						_this.length--;
					}
					else{
						media.imgs[i].onload = function(){
							_this.length--;
						}
					}
				}
			}
		}
		else{
			if(defaultSet["img"] == 1){
				for(var i = 0;i < media.imgs.length;i++){
					if(media.imgs[i].complete){
						_this.length--;
					}
					else{
						media.imgs[i].onload = function(){
							_this.length--;
						}
					}
				}
			}
		}
		console.log(this.length);
	}
	
	this.support = function(){
		//ios7 无法识别该事件
		if("onloadedmetadata" in document){
			media.length = media.imgs.length*defaultSet["img"] + media.audios.length*defaultSet["audio"] + media.vedios.length*defaultSet["vedio"];
			this.length = media.length;
			
			console.log(media.length);
			return true;
		}
		else{
			media.length = media.imgs.length*defaultSet["img"];
			this.length = media.length;
			return false;
		}
	}
	
	this.count();
	
	this.showScale = function(){
		this.scale =parseInt((1 - this.length / media.length)*100) + "%";
		
		if(defaultSet.scaleShow){
			if(defaultSet.scaleEle == "body"){
				_div.innerHTML = this.scale;
			}
			else{
				document.querySelector(defaultSet.scaleEle).innerHTML = this.scale;
			}	
		}
	}
	
	//开始执行
	var time = 0; //开始计时
	var setCount = setInterval(function(){
		time += 40;
		_this.showScale();
		if(_this.length == 0 && time >= defaultSet.minTime){
			defaultSet["loadComplete"]();
			clearInterval(setCount);
		}
	},40);
}

export default window.loadMedia;
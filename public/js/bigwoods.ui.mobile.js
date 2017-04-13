
(function(){	
	
	//click滑出select
	$(".bw-select").click(function(){
		$(this).find(".bw-select-content").slideToggle();
	})
	$(".bw-select").hover(function(){
		
	},function(){
		$(this).find(".bw-select-content").slideUp(600,function(){
			$(this).stop(true);
		})
	})
	$(".bw-select-content li").click(function(e){
		var index = $(".bw-select-content li").index($(this));
		$(this).parent().attr("choose",index+1);
		e.stopPropagation();
		$(this).parent().parent().slideUp();
		$(this).parents(".bw-select").find(".bw-select-title").html($(this).html());
		$(this).parents(".bw-select").find("input[type='hidden']").val($(this).html());
	});
	
	$(".bw-minus-plus .fa").click(function(){
		var parent = $(this).parents(".bw-minus-plus");
		var iIndex = $(parent).find(".fa").index($(this));
		var value = parseInt($(parent).find(".bw-minus-num").html());
		switch(iIndex){
			case 0:
				if(value == 0){
					return;
				}
				else{
					value--;
					if(value == 0){
						$(this).addClass("bw-minus-plus-no");
					}
				}
				break;
			case 1:
				value++;
				if(value >= 1){
					$(parent).find(".fa").eq(0).removeClass("bw-minus-plus-no");
				}
				break;
		}
		$(parent).find(".bw-minus-num").html(value);
	});
	
	//bwShowLoading();
	
	//radio 多选
	$(".bw-radios .bw-radio-check").click(function(){
		var parent = $(this).parents(".bw-radio");
		if($(this).hasClass("bw-radio-check-o")){
			$(this).removeClass("bw-radio-check-o");
			$(parent).find(".sinPrice").attr("choose",1);
		}
		else{
			$(this).addClass("bw-radio-check-o");
			$(parent).find(".sinPrice").attr("choose",0);
		}
	})
	
//	var parent = $(this).parents(".bw-radio");
//		$(parent).find(".bw-radio-check").removeClass("bw-radio-check-o");
//		$(this).addClass("bw-radio-check-o");
//		$(parent).find(".bw-radio-check").attr("choose",0);
//		$(parent).find(".sinPrice").attr("choose",1);

	//radio 单选 [必须选一]
	$(".bw-radio-one .bw-radio-check").click(function(){
		var parent = $(this).parents(".bw-radio");
		$(parent).find(".bw-radio-check").addClass("bw-radio-check-o");
		$(this).removeClass("bw-radio-check-o");
	})	

	//radio 单选  [可以不选]
	$(".bw-radio .bw-radio-check").click(function(){
		var parent = $(this).parents(".bw-radio");
		var index = $(parent).find(".bw-radio-check").index($(this));
		
		$.each($(parent).find(".bw-radio-check"),function(i,ele){
			if(i != index){
				$(ele).addClass("bw-radio-check-o");
				$(ele).attr("choose",0);
			}
		});
		
		if($(this).hasClass("bw-radio-check-o")){
			$(this).removeClass("bw-radio-check-o");
			$(parent).find(".sinPrice").attr("choose",1);
			$(this).attr("choose",1);
		}
		else{
			$(this).addClass("bw-radio-check-o");
			$(parent).find(".sinPrice").attr("choose",0);
			$(this).attr("choose",0);
		}
	})
	
	//下拉框（原生）
	$(".bw-select-tag").change(function(){
		var parent = $(this).parent();
		$(parent).find(".bw-select-title").html($(this).val());
	});
	
	//评论等级
	$(".bw-choose-star .fa").click(function(){
		var parent = $(this).parents(".bw-choose-star");
		var index = $(parent).find(".fa").index($(this));
		$(parent).find(".fa").removeClass("bw-choose-star-o");
		for(var i = 0;i <= index;i++){
			$(parent).find(".fa").eq(i).addClass("bw-choose-star-o");
		}
		$(parent).attr("bw-star",index+1);
	});
	
	//模拟开关 1:on 0:off
	for(var i = 0;i < $(".bw-on-off-button").length;i++){
		if($(".bw-on-off-button").eq(i).attr("bw-on-off") == "1"){
			$(".bw-on-off-button").eq(i).parents(".bw-on-off").addClass("bw-on-off-T");
		}
	}
	$(".bw-on-off").click(function(){
		var button = $(this).find(".bw-on-off-button");
		if($(button).attr("bw-on-off") == "1"){
			$(this).removeClass("bw-on-off-T");	
			$(button).attr("bw-on-off","0");
		}
		else{
			$(this).addClass("bw-on-off-T");
			$(button).attr("bw-on-off","1");
		}
	});
	
	//鼠标上浮显示说明 [采用settimeout解决display与opacity过渡动画的冲突]
	$(".bw-explain-hover").click(function(){
		event.stopPropagation();
		var child = $(this).find(".bw-explain");
		if($(child).hasClass("bw-explain-show-T")){
			$(child).removeClass("bw-explain-show-T");
			setTimeout(function(){
				$(child).hide();
			},500);
		}
		else{
			$(child).show();
			setTimeout(function(){
				$(child).addClass("bw-explain-show-T");
			},100);
		}
	});
	
	//点击body事件集合
	$("body").click(function(){
		$(".bw-explain").removeClass("bw-explain-show-T");
		$(".bw-explain").hide();
	});
})();

	//radio 单选 
	function bwRadio(obj){
		var parent = $(obj).parents(".bw-radio");
		if($(obj).hasClass("bw-radio-check-o")){
			$(obj).removeClass("bw-radio-check-o");
			$(parent).find(".sinPrice").attr("choose",1);
		}
		else{
			$(obj).addClass("bw-radio-check-o");
			$(parent).find(".sinPrice").attr("choose",0);
		}
	}
	
	//radio 单选 【必选】 index：0 表示一个都没勾选
	function bwRadioOne(obj){
		var index;
		$(obj).find(".bw-radio-check").addClass("bw-radio-check-o");
		if($(event.target).find(".bw-radio-check").length != 0){
			index = $(obj).find(".bw-radio-check").index($(event.target).find(".bw-radio-check"));	
			$(event.target).find(".bw-radio-check").removeClass("bw-radio-check-o");
		}
		else{
			index = $(obj).find(".bw-radio-check").index($(event.target));
			$(event.target).removeClass("bw-radio-check-o");
		}
		$(obj).attr("bw-radio",index+1);
	}
	
	//评论等级
	function bwChooseStar(obj){
		//var parent = $(obj).parents(".bw-choose-star");
		if($(event.target).find(".fa").length != 0){
			return;
		}
		var index = $(obj).find(".fa").index($(event.target));
		$(obj).find(".fa").removeClass("bw-choose-star-o");
		for(var i = 0;i <= index;i++){
			$(obj).find(".fa").eq(i).addClass("bw-choose-star-o");
		}
		$(obj).attr("bw-star",index+1);
	}
	
	//loading middle
	var loadHtml = '<div class="bw-loadShape">\
						<div class="bw-load f08">\
							<div class="spinner">\
							  <div class="rect1"></div>\
							  <div class="rect2"></div>\
							  <div class="rect3"></div>\
							  <div class="rect4"></div>\
							  <div class="rect5"></div>\
							</div>\
							<p></p>\
						</div>\
					</div>';
	function bwShowLoading(param){
		if($(".bw-loadShape").length <= 0)$("body").append(loadHtml);
		
		if(arguments.length < 1){
			$(".bw-loadShape p").html("正在跳转");
		}
		else{
			$(".bw-loadShape p").html(param);
		}
		$(".bw-loadShape").show();
	}
	function bwHideLoading(){
		$(".bw-loadShape").hide();
	}
	
	//loading bottom
	var loadBottomHtml = '<div class="bw-loadBottomShape">\
						<div class="bw-load f08">\
							<div class="spinner">\
							  <div class="rect1"></div>\
							  <div class="rect2"></div>\
							  <div class="rect3"></div>\
							  <div class="rect4"></div>\
							  <div class="rect5"></div>\
							</div>\
							<p></p>\
						</div>\
					</div>';
	function bwShowLoadBottom(parent){
		if($(".bw-loadBottomShape").length <= 0){
			if(arguments.length == 1){
				$(parent).append(loadBottomHtml);
			}
			else if(arguments.length == 0){
				$("body").append(loadBottomHtml);	
			}
			else{
				alert("bwShowLoadBottom函数参数错误");
			}
		}
		$(".bw-loadBottomShape").show();
	}
	function bwHideLoadBottom(){
		$(".bw-loadBottomShape .bw-load").html("没有内容了");
	}
	function bwRemoveLoadBottom(){
		$(".bw-loadBottomShape").remove();
	}
	
	// success shape
	var successHtml = '<div class="bw-successShape">\
						<div class="bw-success f08">\
							<svg><polyline points="0,50 24,76 70,20"></polyline></svg>\
							<p></p>\
						</div>\
					</div>';
	function bwShowSuccess(param){
		var defaultSet = {
			point:"提交成功",
			time:1000,
			callback:function(){
				
			}
		}
		for(var i in param){
			defaultSet[i] = param[i];
		}
		
		if($(".bw-successShape").length <= 0)$("body").append(successHtml);
		
		$(".bw-successShape p").html(defaultSet.point);
		console.log($(".bw-successShape polyline"));
		console.log($(".bw-successShape polyline").length);
		$(".bw-successShape polyline").attr("class","polyline-A");
		$(".bw-successShape").show();
		setTimeout(function(){
			$(".bw-successShape").hide();
			defaultSet.callback();
		},defaultSet.time);
	}
					
	//remind shape
	var remindHtml = '<div class="bw-remindShape">\
						<div class="bw-remind f08">\
							<i class="fa fa-exclamation-circle fa-2x"></i>\
							<p></p>\
						</div>\
					</div>';
	function bwShowRemind(param){
		var defaultSet = {
			time:2600,
			point:""
		}
		if($(".bw-remindShape").length <= 0)$("body").append(remindHtml);
		
		if(arguments.length < 1){
			$(".bw-remindShape p").html("Error!Please try again");
		}
		else{
			if(typeof param == "string"){
				$(".bw-remindShape p").html(param);	
			}
			else if(typeof param == "object"){
				for(var i in param){
					defaultSet[i] = param[i];
					$(".bw-remindShape p").html(defaultSet.point);	
				}
			}
			else{
				$(".bw-remindShape p").html("Error!Wrong paramaters");
			}
		}
		$(".bw-remindShape").show();
		setTimeout(function(){
			$(".bw-remindShape").fadeOut();
		},defaultSet.time);
	}
	
	//二次确认
	var sureHtml = '<div class="bw-sureShape">\
						<div class="bw-sure f08">\
							<div><i class="fa fa-bell"></i>&nbsp;<span>温馨提示</span><i class="fa fa-close" onclick="$(\'.bw-sureShape\').hide();"></i></div>\
							<p></p>\
							<ul><li class="bw-button bw-cancle-button" onclick="$(\'.bw-sureShape\').hide();">取消</li><li class="bw-button bw-sure-button">确定</li></ul>\
						</div>\
					</div>';
	function bwShowSure(param){
		var defaultSet = {
			point:"您确定提交吗?",
			sureText:"确定",
			cancleText:"取消",
			sureEvent:function(){
				
			},
			cancleEvent:function(){
				
			}
		}
		for(var i in param){
			defaultSet[i] = param[i];
		}
		if($(".bw-sureShape").length <= 0)$("body").append(sureHtml);
		$(".bw-sureShape").show();
		
		$(".bw-sureShape p").html(defaultSet.point);
		$(".bw-sureShape .bw-button").eq(0).html(defaultSet.cancleText);
		$(".bw-sureShape .bw-button").eq(1).html(defaultSet.sureText);
		
		$(".bw-sureShape .bw-sure-button").unbind("click");
		$(".bw-sureShape .bw-sure-button").click(function(){
			$(".bw-sureShape").hide();
			defaultSet.sureEvent();
		});
		
		$(".bw-sureShape .bw-cancle-button").unbind("click");
		$(".bw-sureShape .bw-cancle-button").click(function(){
			defaultSet.cancleEvent();
		});
	}
	
	//二次确认带输入框
	var inputSureHtml = '<div class="bw-inputShape bw-sureShape">\
							<div class="bw-sure f08">\
								<div><i class="fa fa-bell"></i>&nbsp;<span>温馨提示</span><i class="fa fa-close" onclick="$(\'.bw-sureShape\').hide();"></i></div>\
								<input />\
								<ul><li class="bw-button" onclick="$(\'.bw-sureShape\').hide();">取消</li><li class="bw-button bw-sure-button">确定</li></ul>\
							</div>\
						</div>';
	function bwShowSureInput(param){
		var defaultSet = {
			placeholder:"请输入",
			sureEvent:function(paramVal){
				
			}
		}
		for(var i in param){
			defaultSet[i] = param[i];
		}
		if($(".bw-inputShape").length <= 0)$("body").append(inputSureHtml);
		$(".bw-inputShape").show();
		
		$(".bw-inputShape input").attr("placeholder",defaultSet.placeholder);
		
		$(".bw-inputShape .bw-sure-button").unbind("click");
		$(".bw-inputShape .bw-sure-button").click(function(){
			var inputVal = $(".bw-inputShape input").val();
			$(".bw-inputShape").hide();
			defaultSet.sureEvent(inputVal);
		});
	}
	
	
	//bw-choose-button 单选
	function bwChooseButton(obj){
		var parent = $(obj).parents(".bw-choose-button");
		$(parent).attr("bw-value",$(obj).html());
		$(parent).find(".bw-choose").removeClass("bw-choose-button-o");
		$(parent).find(".bw-choose").attr("bw-choose",0);
		$(obj).addClass("bw-choose-button-o");
		$(obj).attr("bw-choose",1);
	}

	//二次确认[包含下拉选择项]
	var sureHtmlIncludeSelect = '<div class="bw-sureSelectShape bw-sureShape">\
									<div class="bw-sure f08">\
										<div><i class="fa fa-bell"></i>&nbsp;<span>温馨提示</span><i class="fa fa-close" onclick="$(\'.bw-sureSelectShape\').hide();"></i></div>\
										<div class="bw-select">\
											<div class="bw-select-title">rr</div>\
											<select class="bw-select-tag"></select>\
											<i class="fa fa-angle-down fa-lg"></i>\
											<input class="bw-select-input" placeholder="请手动填写" />\
										</div>\
										<ul>\
											<li class="bw-button" onclick="$(\'.bw-sureSelectShape\').hide();">取消</li>\
											<li class="bw-button bw-sure-button">确定</li>\
										</ul>\
									</div>\
								</div>';
	function bwShowSureSelect(param){
		var defaultSet = {
			options:[{type:"0",point:"请输入您撤单的原因"},{type:"100",point:"其他"}],
			sureEvent:function(){
				
			}
		}
		
		if($(".bw-sureSelectShape").length <= 0){
			//显示
			$("body").append(sureHtmlIncludeSelect);
			var selectHide = $(".bw-sureSelectShape .bw-select-tag");
			var selectShow = $(".bw-sureSelectShape .bw-select-title");
			var selectInput = $(".bw-sureSelectShape .bw-select-input");
			$(selectHide).change(function(){
				$(selectShow).html($(this).val());
				$(selectShow).attr("type",$(this).find("option:selected").attr("type"));
				if($(this).val() == defaultSet.options[defaultSet.options.length - 1].point){
					$(selectInput).show();
				}
				else{
					$(selectInput).hide();
				}
			});
			$(selectInput).on("input",function(){
				$(selectShow).html($(selectInput).val());
			});
		}
		$(".bw-sureSelectShape").show();
		
		for(var i in param){
			defaultSet[i] = param[i];
		}
		
		$(selectHide).html("");
		for(var i = 0;i < defaultSet.options.length;i++){
			$(selectHide).append("<option type="+defaultSet.options[i].type+">"+defaultSet.options[i].point+"</option>");
		}
		$(selectShow).html(defaultSet.options[0].point);
		
		$(".bw-sureSelectShape .bw-sure-button").unbind("click");
		$(".bw-sureSelectShape .bw-sure-button").click(function(){
			$(".bw-sureSelectShape").hide();
			defaultSet.sureEvent();
		});
	}
	//比较两个时间段的大小
	function bwCompareDate(prev,next,callback){
		var prevTime;
		var nextTime = parseInt(next.replace(/-/g,""));
		if(prev == "today"){
			var now = new Date();
			prevTime = parseInt(now.getFullYear()*10000+(now.getMonth()+1)*100+now.getDate());
		}
		else{
			prevTime = parseInt(prev.replace(/-/g,""));
		}
		if(nextTime > prevTime){
			callback();
		}
	}

	//放大显示并可滑动评论区图片,需引入swiper.js
	function bwSwiperImg(obj){
		var imgList = $(obj).find(".bw-swiper-img");
		var bwSwiper,imgIndex;
		var swiperHtml = '<div class="switch-img bw-swiper-box">\
							<ul class="swiper-wrapper bw-swiper-wrapper"></ul>\
							<div class="swiper-pagination-box bw-swiper-pagination">\
								<div class="swiper-pagination"></div>\
							</div>\
						</div>';
		$("body").append(swiperHtml);
		$(".bw-swiper-box").click(function(){
			bwSwiper = "";
			$(this).remove();
		});
		for(var i = 0;i < $(imgList).length;i++){
			$(".bw-swiper-wrapper").append('<li class="swiper-slide bw-swiper-slide"><img src='+$(imgList).eq(i).attr("src")+'></li>');
		}
		$(".bw-swiper-box").show();
		//实例化swiper
		bwSwiper = new Swiper('.bw-swiper-box',{
			pagination : '.bw-swiper-pagination',
			speed: 1000,
			loop: "loop",
			autoplayDisableOnInteraction: false,
			paginationType : 'fraction'
		})
		//获取焦点图片的下标
		imgIndex = $(obj).find(".bw-swiper-img").index($(event.target));
		bwSwiper.slideTo(imgIndex+1, 0, false);
		console.log(imgIndex);
	}

//2016.12.10 添加
	
	//获取url中的参数,返回obj
    String.prototype.getUrlParam = function(){
    	//console.log(this);
    	//var nowUrl = window.location.href;
    	var paramObj = {},paramArray = [];
    	if(this.indexOf("?") < 0){
    		console.log("url no param");
    		return false;
    	}
    	var paramPart = this.split("?")[1];
    	var paramName;
    	if(paramPart.indexOf("&") < 0){
			paramName = paramPart.split("=")[0];
    		paramArray.push(paramName);
    		paramObj[paramName] = paramPart.split("=")[1];
		}
    	else{
    		for(var i = 0;i < paramPart.split("&").length;i++){
	    		paramName = paramPart.split("&")[i].split("=")[0];
	    		paramArray.push(paramName);
	    		paramObj[paramName] = paramPart.split("&")[i].split("=")[1];
	    	}	
    	}
    	return paramObj;
    }

//2016.12.13 add

	//判断客户端是否为电脑
	function bwIsPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	} 
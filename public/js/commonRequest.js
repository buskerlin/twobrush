
var $common_request = {
	
	//获取产品类型列表
	getProductsType: function(){
		return new Promise(function(resolve,reject){
			$.ajax({
				type:"post",
				url:"/manage/getProductsType",
				dataType:"json",
				success:function(result){
					resolve(result);
				}
			})
		})
	}
	//or 不用promise
//	getProductsType: function(callback){
//		$.ajax({
//			type:"post",
//			url:"/manage/getProductsType",
//			dataType:"json",
//			success:function(result){
//				callback(result);
//			}
//		})
//	}
};

export default $common_request;
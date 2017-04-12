
/*.. common ..*/
"use strict"
module.exports = {
	
	/*重新组合查询关联表的返回数据,arr[]内的参数为返回数据中内容不同的字段,remark为不同内容组成的数组对应的属性名*/
	jointData(arr,result,remark){
		//commonPart = result[0] 浅拷贝，引用 commonPart===result[0]
		var commonPart = JSON.parse(JSON.stringify(result[0])),  //深拷贝
			differentPart = [],
			different = {};
		for(let i = 0;i < arr.length;i++){
			delete commonPart[arr[i]];
		}
//bug:所有字段都会匹配arr.length次，最后全部通过
//		for(let val in result[0]){
//			for(let i = 0;i < arr.length;i++){
//				if(val != arr[i]){
//					commonPart[val] = result[0][val];	
//				}
//			}
//		}
		console.log(result[0]);
		for(let i = 0;i < result.length;i++){
			different = {};
			for(let j = 0;j < arr.length;j++){
				different[arr[j]] = result[i][arr[j]];
			}
			differentPart.push(different);
		}
		commonPart[remark] = differentPart;
		return commonPart;
	},
	deepCopy(obj){
		//将对象中的属性遍历赋给一个新的对象即可实现深拷贝
	}
}

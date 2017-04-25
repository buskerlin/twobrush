<template>
	<div class="upload-new-product">
		<span>
			<label>刷辊类型：</label>
			<el-select v-model="typeVal" placeholder="请选择类型">
				<el-option v-for="item in options" :value="item.name"></el-option>
			</el-select>
		</span>
	</div>
</template>

<script>
	import $commonReques from "../../js/commonRequest.js"
	export default {
		data(){
			return {
				options: [],
				typeVal: ""
			}
		},
		created(){
			var _this = this;
//			$commonReques.getProductsType().then(function(result){
//				_this.options = result;
//			});
			$commonReques.getProductsType(function(result){
				_this.options = result;
			});
		}
	}
</script>
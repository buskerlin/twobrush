<template>
	<div class="upload-new-product">
		<span>
			<label>类型：</label>
			<el-select v-model="name" placeholder="请选择类型">
				<el-option v-for="item in options" :value="item.name" @click.native="getBrushCode(item.brush_code)" :type="item.brush_code"></el-option>
			</el-select>
		</span>
		<span>
			<label>描述：</label>
			<el-input type="textarea" :autosize="{ minRows: 6}" placeholder="请输入文字介绍" v-model="desc"></el-input>
		</span>
		<span>
			<el-upload action="/manage/uploadImgs" list-type="picture-card" :data="dirData" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
			  	<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog v-model="dialogVisible" size="big">
			  	<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</span>
		<!-- 富文本编辑器 start -->
		<script id="container" name="content" type="text/plain"></script>
		<!-- 富文本编辑器 end -->
	</div>
</template>

<script>
	import $commonReques from "../../js/commonRequest.js"
//	import "../../js/ueditor/ueditor.config.js"
//	import "../../js/ueditor/ueditor.all.js"
//	import "../../js/ueditor/lang/zh-cn/zh-cn.js"
	export default {
		data(){
			return {
				options: [],
				name: "",
				desc: "",
				dialogImageUrl: '',
       			dialogVisible: false,
       			dirData: {
       				dirCode:null
       			}
			}
		},
		methods:{
			handleRemove(file, fileList) {
	            console.log(file, fileList);
	        },
	        handlePictureCardPreview(file) {
	            this.dialogImageUrl = file.url;
	            this.dialogVisible = true;
	        },
	        getBrushCode(code){
	        	this.dirData.dirCode = code;
//	        	$.ajax({
//	        		type: "post",
//	        		url: "/manage/whichDirectory",
//	        		data: {dirCode:code},
//	        		success: function(result){
//	        			
//	        		}
//	        	})
	        }
		},
		watch:{
			name(newV,oldV){
				console.log(this.dirData.dirCode);
			}
		},
		created(){
			var _this = this;
			$commonReques.getProductsType().then(function(result){
				_this.options = result;
			});
			
			//实例化ueditor
//			var ue = UE.getEditor("container");
		}
	}
</script>

<style lang="less">
	.upload-new-product {
		& > span {
			display: block;
			margin-top: 20px;
			& > label {
				vertical-align: top;
				margin-top: 10px;
				display: inline-block;
			}
		}
		.el-input,.el-textarea {
			width:70%;
		}
	}
</style>
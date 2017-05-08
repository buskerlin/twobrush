<template>
	<div class="upload-new-product">
		<span>
			<label>类型：</label>
			<el-select v-model="brush_type" placeholder="请选择类型">
				<el-option v-for="item in options" :value="item.name" @click.native="getbrush_code(item.brush_code)" :type="item.brush_code"></el-option>
			</el-select>
		</span>
		<span>
			<label>名称：</label>
			<el-input type="text" placeholder="请输入文字介绍" v-model="postData.name"></el-input>
		</span>
		<span>
			<label>材料：</label>
			<el-input type="text" placeholder="请输入文字介绍" v-model="postData.material"></el-input>
		</span>
		<span>
			<label>适用范围：</label>
			<el-input type="text" placeholder="请输入文字介绍" v-model="postData.benefit"></el-input>
		</span>
		<span>
			<label>描述：</label>
			<el-input type="textarea" :autosize="{ minRows: 6}" placeholder="请输入文字介绍" v-model="postData.desc"></el-input>
		</span>
		<span>
			<label>cover上传：</label>
			<div class="upload-img-box">
				<el-upload action="/manage/uploadImgs" @click.native="surebrush_code" multiple :auto-upload="true" list-type="picture-card" :data="{brush_code:postData.brush_code,subfile_dir:postData.subfile_dir,type:'cover'}" 
					:on-preview="handlePictureCardPreview" 
					:on-success="successDilog" 
					:on-remove="handleRemove">
				  	<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog v-model="dialogVisible" size="big">
				  	<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>
		</span>
		<span>
			<label>banner上传：</label>
			<div class="upload-img-box">
				<el-upload action="/manage/uploadImgs" @click.native="surebrush_code" multiple ref="uoloadImg" :auto-upload="true" list-type="picture-card" :data="{brush_code:postData.brush_code,subfile_dir:postData.subfile_dir,type:'banner'}" 
					:on-preview="handlePictureCardPreview" 
					:on-success="successDilog" 
					:on-remove="handleRemove">
				  	<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog v-model="dialogVisible" size="big">
				  	<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>
		</span>
		<el-button type="primary" @click="submitPostData" size="large">上传<i class="el-icon-upload el-icon--right"></i></el-button>
	</div>
</template>

<script>
	import $commonReques from "../../js/commonRequest.js"
	export default {
		data(){
			return {
				options: [],
				brush_type: "",
				desc: "",
				dialogImageUrl: "",
       			dialogVisible: false,
       			postData: {
       				brush_code: "",
       				name: "",
       				desc: "",
       				carousel: [],
       				material: "",
       				benefit: "",
       				subfile_dir: ""
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
	        getbrush_code(code){
	        	//brush_code:类型文件夹名称
	        	this.postData.brush_code = code;
	        	//subfile_dir:子文件夹名称
	        	this.postData.subfile_dir  = new Date().getTime();
	        },
	        successDilog(){
	        	this.$message({
	        		type: "success",
	        		showClose: true,
	        		message: "图片上传服务器成功"
	        	});
	        },
	        surebrush_code(){
	        	if(!this.postData.brush_code && event.target.tagName == "INPUT"){
	        		this.$message({
		        		type: "error",
		        		showClose: true,
		        		message: "请先选择图片类型"
		        	});
	        		event.preventDefault();
	        		return;
	        	}
	        },
	        submitPostData(){
	        	var postData = new FormData(),$vm = this;
	        	for(var key in this.postData){
	        		if(!this.postData[key]){
	        			this.$message({
			        		type: "error",
			        		showClose: true,
			        		message: "请填写所有信息"
			        	});
			        	return;
	        		}
	        		postData.append(key,this.postData[key]);
	        	}
	        	$.ajax({
	        		type: "post",
	        		url: "/manage/uploadImgs",
	        		data: postData,
	        		processData: false,  // 告诉jQuery不要去处理发送的数据
  					contentType: false,   // content-type已被设置为:multipart/form-data
  					xhrFields: {
				        onprogress: function(e) {
				            //this是指向XHR (xhrFields属性返回的是一个xhr对象)
				            //console.log(e.total);
				            console.log(e.loaded);
				        }
				    },
	        		success: function(res){
	        			console.log(res);
	        		}
	        	});
	        }
		},
		watch:{
			postData: {
				handler(newVal,oldVal){
					//console.log(newVal);
				},
				deep: true
			}
		},
		created(){
			var _this = this;
			$commonReques.getProductsType().then(function(result){
				_this.options = result;
			});
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
				width:100px;
				margin-right:10px;
				text-align: right;
			}
		}
		.el-input,.el-textarea {
			width:70%;
		}
		.upload-img-box {
			display: inline-block;
		}
		.v-modal {
			opacity: .1;
		}
	}
</style>
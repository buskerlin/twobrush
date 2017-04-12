<template>
	<div class="product-details">
		<div class="swiper-banner">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<img src="../img/details/details01.png"/>
				</div>
				<div class="swiper-slide">
					<img src="../img/details/details02.png"/>
				</div>
				<div class="swiper-slide">
					<img src="../img/details/details03.png"/>
				</div>
			</div>
		</div>
		<p class="title">直接定义initData:null会导致 desc null</p>
		<div class="details">
			<ul>
				<li><label>优惠：</label>xxxxxxxxxxx</li>
				<li><label>材质：</label>xxxxxxxxxxxxxxxx</li>
			</ul>
		</div>
		<div class="explation">
			<!-- desc null 导致模板挂载过程出错，在mounted()钩子函数内无法获取到模板内元素 -->
			<!-- 直接定义initData:null会导致 desc null -->
			<div class="nav-title border-bottom">产品说明</div>
			<p>{{initData.desc}}</p>
		</div>
		<!-- v-bind 将属性值当作表达式执行 -->
		<my-board :thumbs="{thumb:initData.thumbs,id:initData.id,remarks:initData.remarks}"></my-board>
	</div>
</template>

<script>
	import "swiper";
	import board from "./board.vue";
	export default {
		data(){
			return {
				initData:{}
			}
		},
		components:{myBoard:board},
		methods:{
			getDetails(){
				//获取数据
				var _this = this;
				$.ajax({
					type:"post",
					url:"/products/getDetails",
					dataType:"json",
					data:{id:_this.$route.params.id},
					success(result){
						_this.initData = result;
					}
				});
//				$.get("/products/getDetails",{id:_this.$route.params.id},function(result){
//					_this.initData = result;
//					console.log("999999999");
//					console.log(result);
//				});
			}
		},
		beforeCreate(){
			layer.open({
			    type:2
			});
			$("body").scrollTop(0);
		},
		created(){
			this.getDetails();
		},
		mounted(){
			console.log(this.initData);
			var loader = new loadMedia({
				parent:".product-details",
				loadComplete:function(){
					layer.closeAll();
				}
			});
			var swiper = new Swiper(".swiper-banner",{
				autoplay: 4000,
				autoplayDisableOnInteraction: false,
				loop: true
			})
		}
	}
</script>

<style lang="less">
	@import "../css/rule.less";
	.product-details {
		position:absolute;
		top:0;
		width:100%;
		min-height:100%;
		background-color:#f5f5f5;
		.swiper-banner {
			height:9.4rem;
		}
		.title {
			background-color:#fff;
			margin:0;
			padding:0.8rem 5%;
		}
		.details {
			margin:0.4rem auto;
			background-color:#fff;
			padding:0.4rem 5%;
			font-size:0.6rem;
			line-height:1rem;
		}
		.explation {
			p{
				color:#9AABB8;
				padding:0.8rem 5% 2rem 5%;
				line-height:@fontbody * 1.6;
				background-color:#fff;
				margin:0;
				text-indent:(@fontbody * 2);
			}
		}
	}
</style>
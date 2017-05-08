<template>
	<div class="product-details">
		<div class="swiper-banner">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="item in carousel">
					<img :src="item"/>
				</div>
			</div>
		</div>
		<p class="title">{{initData.title}}</p>
		<div class="details">
			<ul>
				<li><label>刷辊材质：</label>{{initData.material}}</li>
				<li><label>适用于：</label>{{initData.benefit}}</li>
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
				initData: {},
				carousel: []
			}
		},
		components:{myBoard:board},
		methods:{
			getDetails(){
				//获取数据
				var $vm = this;
				$.ajax({
					type:"post",
					url:"/products/getDetails",
					dataType:"json",
					data:{id:$vm.$route.params.id},
					success(result){
						$vm.initData = result;
						$vm.carousel = result.carousel.split(",");
					}
				});
			}
		},
		beforeCreate(){
			bwShowLoading("正在加载");
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
					bwHideLoading();
				}
			});
		},
		updated(){
			//v-for会在updated钩子阶段触发
			var swiper = new Swiper(".swiper-banner",{
				autoplay: 4000,
				autoplayDisableOnInteraction: false,
				loop: true
			})
		}
	}
</script>

<style lang="less">
	@import "../../css/rule.less";
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
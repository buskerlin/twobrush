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
		<div>
			<!-- desc null 导致模板挂载过程出错，在mounted()钩子函数内无法获取到模板内元素 -->
			<!-- 直接定义initData:null会导致 desc null -->
			<p>{{initData.desc}}</p>
		</div>
	</div>
</template>

<script>
	import "swiper";
	export default {
		data(){
			return {
				initData:{}
			}
		},
		methods:{
			getDetails(){
				//获取数据
				var _this = this;
				console.log(_this.$route.params.id);
				$.get("/getDetails",{id:_this.$route.params.id},function(result){
					_this.initData = result[0];
				});
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
	.product-details {
		position:absolute;
		top:0;
		width:100%;
		min-height:100%;
		background-color:#fff;
		.swiper-banner {
			height:9.4rem;
		}
	}
</style>
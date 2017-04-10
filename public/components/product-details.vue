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
			<p>{{initData.desc}}</p>
		</div>
	</div>
</template>

<script>
	import "swiper";
	export default {
		data(){
			return {
				initData:null
			}
		},
		beforeCreate(){
			layer.open({
			    type:2
			});
			
			//获取数据
			var _this = this;
			console.log(_this.$route.params.id);
			$.get("/getDetails",{id:_this.$route.params.id},function(result){
				console.log(JSON.parse(JSON.stringify(result)));
				_this.initData = JSON.parse(JSON.stringify(result));
			});
		},
		mounted(){
			new loadMedia({
				parent:".product-details",
				loadComplete:function(){
					layer.closeAll();
				}
			});
			new Swiper(".swiper-banner",{
				autoplay: 4000,
				autoplayDisableOnInteraction: false,
				loop: true
			})
		}
	}
</script>

<style lang="less">
	.product-details {
		position:fixed;
		top:0;
		width:100%;
		min-height:100%;
		background-color:#fff;
		.swiper-banner {
			height:9.4rem;
		}
	}
</style>
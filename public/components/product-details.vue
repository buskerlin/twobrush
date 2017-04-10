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
			
		</div>
	</div>
</template>

<script>
	import "swiper";
	export default {
		data(){
			return {
				
			}
		},
		beforeCreate(){
			layer.open({
			    type:2
			 });
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
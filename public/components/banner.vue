<template>
	<div class="swiper-banner">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<img src="../img/banner01.jpg"/>
			</div>
			<div class="swiper-slide">
				<img src="../img/banner02.jpg"/>
			</div>
			<div class="swiper-slide">
				<img src="../img/banner03.jpg"/>
			</div>
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
		//属于vue的生命周期 mounted:html结构已经挂载到页面中
		mounted(){
			var swiper = new Swiper(".swiper-banner",{
				autoplay: 4000,
				autoplayDisableOnInteraction: false,
				loop: true
			})
		},
		props:["title"]
	}
	
	//console.log(document.querySelector(".swiper-wrapper")); -> null
</script>
<style lang="less">
	.swiper-banner {
		width:100%;
		height:6rem;
		background-color:#ddd;
		position:relative;
		overflow: hidden;
		
		.swiper-wrapper {
			width:100%;
			height:100%;
			align-content: center;
			display: flex;
			flex-wrap: nowrap;
			
			.swiper-slide {
				width:100%;
				flex-shrink:0;
				
				img {
					width:100%;
				}
				
			}
		}
	}
</style>
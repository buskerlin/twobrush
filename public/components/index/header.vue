<template>
	<div class="header">
		<img src="/img/logo.png" />
		<span>{{title}}</span>
	</div>
</template>
<script>;
	export default {
		data(){
			return {
				
			}
		},
		props:["title"]
	}
</script>
<style lang="less">
	.header {
		height:2rem;
		width:100%;
		background-color:#373e40;
		position:relative;
		overflow: hidden;
		img {
			width:1.6rem;
			border-radius:50%;
			margin:0.2rem 0 0 4%;
			float:left;
			background-color:#f5f5f5;
		}
		span {
			float:left;
			color:#fff;
			font-size:0.8rem;
			margin:0.6rem 0 0 3%;
		}
	}
</style>
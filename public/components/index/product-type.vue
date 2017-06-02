<template>
	<div class="product-type">
		<ul>
			<a href="#top" v-for="(item,index) in typeArray">
				<li>
					<span>类型{{index+1}}</span>
				</li>	
			</a>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				typeArray: new Array(12)
			}
		},
		created(){
			
		}
	}
</script>

<style lang="less">
	@-webkit-keyframes slideup{
		from{-webkit-transform: translateY(14rem);opacity:0.4;}
		to{-webkit-transform: translateY(0);opacity:1;}
	}
	.product-type {
		width:100%;
		position:fixed;
		height:100%;
		top:0;
		background-color:rgba(0,0,0,0.6);
		& > ul {
			width:100%;
			display:inline-block;
			background-color:#fff;
			position:absolute;
			bottom:2.6rem;
			-webkit-animation: slideup 0.4s ease-in forwards;
		}
		li {
			/*flex:1; 表示内部内容宽度一致*/
			width:25%;
			padding-top:25%;
			margin:0;
			float:left;
			border:1px solid #f5f5f5;
			border-top:0;
			border-left:0;
			box-sizing: border-box;
			position:relative;
			& > span {
				position:absolute;
				width:100%;
				text-align:center;
				top:44%;
			}
		}
	}
</style>
<template>
	<div class="contact-us">
		<ul>
			<li>
				<p>拨打电话10086</p>
				<span class="normal-button">点我拨打电话</span>
				<p>或</p>
			</li>
			<li>
				<p>关注官方公众号</p>
				<img class="qrcode" src="img/qrcode.png" />
				<p>或</p>
			</li>
			<li>
				<p>留下联系方式</p>
				<input class="phone-input" type="text" id="" value="" />
			</li>
		</ul>
	</div>
</template>
<script>
	import bus from "../js/eventBus.js";
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		},
		beforeCreate(){
			 layer.open({
			    type:2
			  });
		},
		mounted(){
			//改变this指向
			var loader = new loadMedia({
				parent:".contact-us",
				loadComplete:function(){
					layer.closeAll();
				}
			});
		},
		destroyed(){
			bus.$emit("indexInit");
		}
	}
	
</script>
<style lang="less">
	@import "../css/rule.less";
	.contact-us {
		position:fixed;
		top:0;
		width:100%;
		height:100%;
		background-color:#fff;
		& > ul {
			width: 60%;
			margin:2rem auto;
			& > li {
				p:nth-child(1) {
					color:@lightText;
					font-size:0.7rem;
					margin:0.2rem 0;
				}
				p:nth-of-type(2) {
					margin:0.4rem 0;
					color:@darkText;
				}
				.qrcode {
					width:80%;
					margin:0 auto;
				}
				.phone-input {
					
				}
			}
		}
	}
</style>
<template>
	<div class="contact-us">
		<div>
			<p class="tips">长按关注两把刷子官方微信号</p>
			<div class="qrcode-box">
				<span class="left"></span>
				<span class="right"></span>
				<hr></hr>
				<img class="qrcode" src="/img/qrcode.png" />
				<div>分享给好友</div>
			</div>
		</div>
		<ul>
			<li>
				<a href="tel:15288181948"><span class="normal-button">拨打电话</span></a>
			</li>
			<li>
				<a href="sms:15288181948?body=你好，我是谁"><span class="normal-button">发送短信</span></a>
			</li>
		</ul>
	</div>
</template>
<script>
	import bus from "../../js/eventBus.js";
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		},
		beforeCreate(){
			bwShowLoading("正在加载");
		},
		mounted(){
			//改变this指向
			var loader = new loadMedia({
				parent:".contact-us",
				loadComplete:function(){
					bwHideLoading();
				}
			});
		},
		destroyed(){
			bus.$emit("indexInit");
		}
	}
	
</script>
<style lang="less">
	@import "../../css/rule.less";
	.contact-us {
		position:fixed;
		top:0;
		width:100%;
		height:100%;
		background-color:#f5f5f5;
		.tips {
			color:@lightText;
			font-size:0.6rem;
			text-align: center;
			margin:1.6rem 0 0.2rem 0;
		}
		.qrcode-box {
			background-color:#fff;
			width:11rem;
			height:14rem;
			margin:0 auto 1rem auto;
			border-radius: 6px;
			position:relative;
			span {
				position:absolute;
				top:10rem;
				width:0.5rem;
				height:1rem;
				background-color:#f5f5f5;
			}
			.left {
				border-radius:0% 1rem 1rem 0;
			}
			.right {
				border-radius:1rem 0 0 1rem;
				right:0;
			}
			hr {
				height:0;
				border:1px dashed #eee;
				-webkit-transform: scaleY(0.5);
				width:80%;
				vertical-align: middle;
				display: inline-block;
				position:absolute;
				top:10.5rem;
				margin:0 1rem;
			}
			.qrcode {
				width:70%;
				margin:0 auto;
				padding-top:1.4rem;
			}
			div {
				.button (@height:2rem,@radius:5px,@color:#00B7FF);
				width:80%;
				position:absolute;
				bottom:0.8rem;
				left:10%;
				background-color:@red;
			}
		}
		& > ul {
			width: 60%;
			margin:1rem auto;
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
			.normal-button {
				margin-bottom:0.5rem;
				color:@blue;
				background-color:#f5f5f5;
				border:1px solid @blue;
			}
		}
	}
</style>
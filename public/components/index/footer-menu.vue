<template>
	<div class="footer">
		<ul class="footer-ul box-shadow-top">
			<li class="active">
				<router-link to="/">
					<i class="fa fa-home db active"></i>
					<span>首页</span>
				</router-link>
			</li>
			<li>
				<router-link to="/productType">
					<i class="fa fa-list db"></i>
					<span>产品分类</span>
				</router-link>
			</li >
			<li>
				<router-link to="/contactUs">
					<i class="fa fa-phone db"></i>
					<span>联系我们</span>
				</router-link>
			</li>
			<li>
				<router-link to="/actives">
					<i class="fa fa-trophy db"></i>
					<span>活动推广</span>
				</router-link>
			</li>
			<li>
				<router-link to="/agent">
					<i class="fa fa-users db"></i>
					<span>代理商</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	
	import bus from "../../js/eventBus.js";
	
	//导出一个函数块，将会被挂载到index.js中的vue实例内
	export default {
		//在vue组件中，data必须是一个函数，return返回一个对象
		data(){
			return {
				
			}
		},
		methods: {
//			changeMenu(e){
//				if($(e.target).parents(".footer-ul").length <= 0) return;
//				$(".footer li").removeClass("active");
//				if(e.target.tagName == "LI") 
//					$(e.target).addClass("active");
//				else 
//					$(e.target).parents("li").addClass("active");
//			}
		},
		mounted(){
//			bus.$on("indexInit",function(){
//				console.log("init index");
//				$(".footer li").removeClass("active");
//				$(".footer li").eq(0).addClass("active");
//			});
		},
		props:["message"]
	}
</script>
<style lang="less">
	@import "../../css/rule.less";
	
	.border-top:after {
		.border-1px-vertical(@iconbg);
	    top:0;
	}
	
	.footer {
		position:fixed;
		bottom:0;
		width:100%;
		height:2.6rem;
		z-index:999;
		ul{
			text-align:center;
			width:100%;
			height:100%;
			background-color: @elebg;
			.active {
				i,span {
					color:@iconbg;
				}
			}
			li:nth-child(3).active {
				i {
					background-color:#FD6365;
				}
			}
			li{
				width:20%;
				float:left;
				height:100%;
				i {
					color:@lightText;
					margin:0.5rem 0 0.3rem 0;
					font-size:1rem;
				}
				span {
					font-size:0.4rem;
					color: @darkText;
					display: block;
				}
			}
			li:nth-child(3){
				position:relative;
				z-index:999;
				i {
					width:2.6rem;
					height:2.6rem;
					border:0.2rem solid #eee;
					border-radius:50%;
					margin:-1.4rem auto 0.2rem auto;
					background-color:@iconbg;
					text-align: center;
					line-height:2.8rem;
					color:#fff;
				}
			}
		}
	}
</style>
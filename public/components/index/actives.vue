<template>
	<div class="actives">
		<div>
			<ul>
				<li v-for="item in testArr">
					<div class="left">
						<p class="time">发布时间：2017.06.04</p>
						<h4 class="title">父亲节温情来电显示创意H5</h4>
						<div class="share">
							<span>浏览1989</span>
							<span>分享198</span>
						</div>
					</div>
					<div class="right">
						<img src="../../img/actives/fatherDay.jpg" />
					</div>
				</li>
			</ul>
			<!-- 分割线  start -->
			<div class="slot-line">
				<hr></hr>
				<span>没有了</span>
				<hr></hr>
			</div>
			<!-- 分割线  end -->
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				testArr: new Array(10)
			}
		}
	}
</script>

<style lang="less">
	@import "../../css/rule.less";
	.actives {
		position:fixed;
		width:100%;
		top:0;
		height:100%;
		background-color:#fff;
		& > div {
			width:100%;
			overflow-y:scroll;
			padding-bottom:5rem;
			box-sizing:border-box;
			height:100%;
			ul {
				width:100%;
			}
			li {
				width:90%;
				padding:1rem 5%;
				position:relative;
				.left {
					width:60%;
				}
				.time,.share {
					margin:0;
					color:#9aabb8;
					font-size:0.5rem;
				}
				.title {
					margin:0.2rem 0;
				}
				.share span:nth-child(1){
					margin-right:0.6rem;
				}
				.right {
					width:3.2rem;
					height:3.2rem;
					position:absolute;
					top:1rem;
					right:8%;
					img {
						width:100%;
					}
				}
			}
			li:after {
				.border-1px-vertical;
				bottom:0;
			}
		}
		.slot-line {
			margin-top:1.6rem;
		}
	}
</style>
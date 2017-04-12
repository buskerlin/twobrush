<template>
	<div class="board-part">
		<ul class="board-button">
			<li class="heart-scale"><i class="fa fa-heart"></i></li>
			<li @click="showText()"><i class="fa fa-commenting-o">&ensp;</i>留言</li>
			<li><i class="fa click-heart fa-heart-o" @click="thumb()"></i>&ensp;点赞[<span class="thumb-show">{{thumbs.thumb}}</span>]</li>
		</ul>
		<div class="board-say">
			<div>
				<textarea id="message" placeholder="说点什么"></textarea>
				<ul>
					<li @click="leaveMessage()">发布</li>
					<li @click="showText()">取消</li>
				</ul>
			</div>
			<div class="remark-list">
				<div v-show="commentList.remarks[0].remark">
					<span class="floor">新</span>
					<span class="textarea">{{commentList.remarks[commentList.remarks.length - 1].remark}}</span>
				</div>
				<ul>
					<!-- v-if 和 v-show的区别 -->
					<li v-for="(word,index) in commentList.remarks" v-show="word.remark">
						<span class="floor">{{index+1}}楼</span>
						<span class="textarea">{{word.remark}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				commentList:{},
			}
		},
		/*props中的值没有绑定setter()和getter()*/
		props:["thumbs"],
		methods:{
			thumb(){
				var _this = this;
				$(".heart-scale").removeClass("heart-scale-A");
				$.ajax({
					type:"post",
					url:"/products/addThumb",
					data:{id:_this.thumbs.id},
					dataType:"json",
					success(result){
						$(".thumb-show").html(result.thumbs);
						$(".click-heart").addClass("fa-heart").removeClass("fa-heart-o");
						$(".heart-scale").addClass("heart-scale-A");
					}
				});
			},
			showText(){
				$(".board-say > div").eq(0).slideToggle();
			},
			leaveMessage(){
				var _this = this;
				$.ajax({
					type:"post",
					url:"/products/leaveMessage",
					data:{id:_this.thumbs.id,remark:$("#message").val()},
					dataType:"json",
					success(result){
						_this.thumbs.remarks = result;
					}
				});
			}
		},
		//mounted时执行this.thumbs各属性值还为空;因为子组件的mounted()要先于父祖件的created()执行
		updated(){
			console.log(this.thumbs);
			this.commentList = this.thumbs;
		}
	}
</script>

<style lang="less">
	@import "../css/rule.less";
	.board-part {
		.board-button {
			width:100%;
			margin:1rem 0;
			position:relative;
			li{
				float:right;
				margin-right:6%;
				.fa-commenting-o {
					font-size:0.8rem;
				}
				.fa-heart{
					color:#f44336;
				}
			}
			.heart-scale {
				position:absolute;
				left:40%;
				top:-2.4rem;
				font-size:3rem;
				line-height: 3rem;
				text-align: center;
				-webkit-transform: scale(0.3);
				opacity: 0;
			}
			@-webkit-keyframes heart-scale{
				0%{-webkit-transform: scale(0.3);opacity: 0;top:-2.4rem;}
				30%{-webkit-transform: scale(0.6);opacity: 1;top:-3rem;}
				100%{-webkit-transform: scale(1);opacity: 0;top:-5rem;}
			}
			.heart-scale-A {
				-webkit-animation: heart-scale 1.6s linear;
			}
		}
		.board-say {
			width:90%;
			margin:3rem auto;
			overflow:hidden;
			& > div:nth-child(1){
				display:none;
				margin-top:0.5rem;
				ul{
					overflow: hidden;
				}
				li {
					.button(1.2rem,5px,#fff);
					border:1px solid @lightText;
					color:@lightText;
					width:3rem;
					float:right;
					font-size:0.6rem;
					margin-left:6%;
					margin-top:0.3rem;
				}
			}
			.remark-list {
				margin-top:0.8rem;
				li {
					margin:0.4rem auto;
				}
				& > div {
					border-bottom:1px dotted @lightText;
					padding-bottom:0.4rem;
					margin-bottom:1rem;
					.floor {
						color:#F44336;
						border-color:#F44336
					}	
				}
				.floor {
					border:1px solid #ddd;
					.button(1.4rem,50%,#fff);
					width:1.4rem;
					color:@lightText;
					font-size:0.6rem;
					margin-right:2%;
					box-sizing:border-box;
				}
				.textarea {
					width:86%;
					line-height:1rem;
					vertical-align: middle;
					word-wrap: break-word;
				}
			}
		}
	}
</style>
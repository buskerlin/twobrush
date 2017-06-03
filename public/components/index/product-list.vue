<template>
	<div class="content-part box-shadow-top">
		<a name="top">
			<div class="nav-title border-bottom">产品展示区域<span>[点击图片可查看详细说明]</span></div>
			<!-- 分割线  start -->
			<div class="slot-line">
				<hr></hr>
				<span>类型1</span>
				<hr></hr>
			</div>
			<!-- 分割线  end -->
			<ul>
				<li v-for="item in listData" :param="item.id">
					<router-link :to="/pDetails/+item.id">
						<div class="border-bottom">
							<img :src="item.cover" />
						</div>
						<div>
							<span class="tips">{{item.desc}}</span>
							<span class="scan-num"><i class="fa fa-eye"></i><span>{{item.pv}}</span></span>
						</div>
					</router-link>
				</li>
			</ul>
		</a>
	</div>
</template>
<script>
	
	export default {
		data(){
			return {
				listData:null
			}
		},
		methods:{
			
		},
		beforeCreate(){
			var $vm = this;
			console.log(this);
			$.get("/products/getListData",function(result){
				console.log(this);
				$vm.listData = result;
			})
		}
	}
	
</script>
<style lang="less">
	.content-part {
		width:100%;
		margin:0.6rem auto;
		img {
			width:100%;
		}
		/*直系子元素*/
		ul {
			width:100%;
			display:flex;
			align-content: center;
			justify-content: space-around;
			flex-wrap: wrap;
			padding:0.5rem 2% 3rem 2%;
			background-color: #fff;
			box-sizing: border-box;
			& > li {
				width:48%;
				background-color:#fff;
				box-shadow: 0 0 4px 0px #ddd;
				margin-bottom:0.5rem;
				div:nth-child(1){
					height: 7rem;
				    flex-direction: column;
				    justify-content: center;
				    display: flex;
				    padding:0 4%;
				}
				div:nth-child(2) {
					padding: 0.4rem 6%;
				    height: 1.4rem;
				    background-color: #F8F8F8;
				    position:relative;
					.tips {
						font-size:0.5rem;
						line-height:0.7rem;
						color:#34495e;
						width:70%;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						text-overflow:ellipsis;
					}
					.scan-num {
						color:#9aabb8;
						position:absolute;
						top:0.8rem;
						right:0.4rem;
						font-size:0.6rem;
						span {
							font-size:0.5rem;
							margin-left:0.1rem;
						}
					}
				}
			}
		}
		.slot-line {
			overflow: hidden;
			margin-top:0.6rem;
			color:#9aabb8;
			font-size:0.6rem;
			text-align:center;
			& > * {
				
			}
			hr {
				height:0;
				border:1px dashed #ddd;
				-webkit-transform: scaleY(0.5);
				width:42%;
				vertical-align: middle;
				display: inline-block;
			}
			span {
				width:12%;
				display: inline-block;
				text-align:center;
			}
		}
	}
</style>
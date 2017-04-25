<template>
	<div class="nav-menu">
		<el-col>
			<div class="icon">
				<img src="/img/logo.png">
			</div>
		    <el-menu default-active="1" theme="light" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
		        <!--<el-submenu index="1">
			        <template slot="title"><i class="el-icon-message"></i>导航一</template>
			        <el-menu-item-group>
			            <template slot="title">分组一</template>
			            <el-menu-item index="1-1">选项1</el-menu-item>
			            <el-menu-item index="1-2">选项2</el-menu-item>
			        </el-menu-item-group>
			        <el-menu-item-group title="分组2">
			            <el-menu-item index="1-3">选项3</el-menu-item>
			        </el-menu-item-group>
			        <el-submenu index="1-4">
			            <template slot="title">选项4</template>
			            <el-menu-item index="1-4-1">选项1</el-menu-item>
			        </el-submenu>
			    </el-submenu>-->
			    <router-link to="/upload_new_product">
			    	<el-menu-item index="1" router=""><i class="el-icon-menu"></i>上传图片</el-menu-item>
			    </router-link>
		        <el-menu-item index="2"><i class="el-icon-setting"></i>导航三</el-menu-item>
		    </el-menu>
		</el-col>
	</div>
</template>

<script>
</script>

<style lang="less">
	.nav-menu {
		height:100%;
		.el-col {
			height:100%;
			background-color:#eef1f6;
			.el-menu {
				padding-top:20px;
			}	
		}
		.icon {
			width:100%;
			overflow:hidden;
			background-color:#1F2D3D;
			img {
				width:30%;
				margin:20% auto;
				padding:5%;
				border-radius:50%;
				background-color:#fff;
			}
		}
	}
</style>
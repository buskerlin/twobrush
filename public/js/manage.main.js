
import "../css/manage.main.less"
import Element from "element-ui"
import 'element-ui/lib/theme-default/index.css'
import Vue from "vue"
import Router from "vue-router"

Vue.use(Element);
Vue.use(Router);

import navMenu from "../components/manage/nav-menu.vue"

const router = new Router({
	routes:[
		{path: "/upload_new_product",component: resolve => require(['../components/manage/test.vue'],resolve)},
	]
})

new Vue({
	el:"#manage",
	data:{
		input:"sad"
	},
	router,
	components:{navMenu}
});

if (module.hot) {
  module.hot.accept();
}
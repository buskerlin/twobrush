
//rule.less 包含所有表达式
//import引入js文件，文件中的语句会被执行，如果要访问其中的变量或者方法，必须用export进行暴露

import "./css/main.less";
import "./js/main.js";
//import "layer.mobile";
import Vue from "vue";
import Router from "vue-router";
//export default window.loadMedia 将loadMedia暴露于window对象中其他组件也可以获取
import loadMedia from "./js/loadMedia.js";

Vue.use(Router);

/*..components..*/
import myFooter from "./components/footer-menu";
import myHeader from "./components/header";
import myBanner from "./components/banner";
import myContent from "./components/product-list";

console.log(this); //undefined ES6默认js的严格模式 ，this禁止指向全局对象 

//实例化传的参数 属性名是 routes 而不是 routers
const router = new Router({
//	mode: "history",
	routes:[
		{path: "/contactUs",component: resolve => require(['./components/contact-us.vue'],resolve)},
		{path: "/pDetails/:id",component: resolve => require(['./components/product-details.vue'],resolve)}
	]
});
//如果#app元素还没有生成则需要延迟挂载 $mount("#app")
//components内包含的组件和contact-us.vue里的this都指向下面的这个Vue实例 ? err:组件也会被实例化，所以都指向组件本身的实例
var bbb = new Vue({
	el: "#app",
	router,
	components: {myFooter,myHeader,myBanner,myContent},
	beforeCreate(){
		console.log(this);
	}
});

if (module.hot) {
  module.hot.accept();
}
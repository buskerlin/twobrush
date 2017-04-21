
import Element from "element-ui";
import 'element-ui/lib/theme-default/index.css';
import Vue from "vue";

Vue.use(Element);

new Vue({
	el:"#upload",
	data:{
		input:"sad"
	}
});
if (module.hot) {
  module.hot.accept();
}
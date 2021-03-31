import "@/icons";
import "@/styles/index.scss";
import "@/utils/permission";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css/normalize.css";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

Vue.prototype.$bus = new Vue();

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});

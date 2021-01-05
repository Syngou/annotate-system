import store from "@/store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.prototype.$bus = new Vue();
new Vue({
  router,

  store,
  render: (h) => h(App),
}).$mount("#app");

import axios from "axios";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.prototype.$axios = axios;

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");

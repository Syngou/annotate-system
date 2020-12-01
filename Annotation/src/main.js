import axios from "axios";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import Vue from "vue";
import App from "./App.vue";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.config.devtools = true;
new Vue({
    el: "#app",
    render: (h) => h(App),
}).$mount("#app");

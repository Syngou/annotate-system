// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from "axios";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ViewUI);
/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>",
});

import "@/icons"; // icon
import "@/permission"; // permission control
import "@/styles/index.scss"; // global css
import ElementUI from "element-ui";
// import locale from "element-ui/lib/locale/lang/en"; // lang i18n
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import Vue from "vue";
import VueParticles from "vue-particles";
import App from "./App";
import router from "./router";
import store from "./store";

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
    const { mockXHR } = require("../mock");
    mockXHR();
}

Vue.prototype.$bus = new Vue();

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI);
Vue.use(VueParticles);
Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    store,
    render: (h) => h(App),
});

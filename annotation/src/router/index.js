import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const Home = () => import("@/page/Home");
const User = () => import("@/page/User");
const page404 = () => import("@/page/page404");

export default new Router({
    routes: [
        {
            path: "",
            component: Home,
        },
        {
            path: "/user",
            component: User,
        },
        {
            path: "*",
            component: page404,
        },
    ],
    mode: "history",
});

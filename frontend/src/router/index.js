import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const Home = () => import("@/page/Home/Home");
const User = () => import("@/page/User/User");
const page404 = () => import("@/page/Page404/Page404");
export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
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
});

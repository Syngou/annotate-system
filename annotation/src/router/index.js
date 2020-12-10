import Home from "@/page/Home";
import page404 from "@/page/page404";
import User from "@/page/User";
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
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
    mode: "history",
});

import layout from "@/layouts/layout";
import Home from "@/page/Home";
import Login from "@/page/Login";
import page404 from "@/page/Page404";
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            component: layout,
            children: [
                {
                    path: "/",
                    component: Home,
                    exact: true,
                },
                {
                    path: "/login",
                    component: Login,
                },
                {
                    path: "*",
                    component: page404,
                },
            ],
        },
    ],
});

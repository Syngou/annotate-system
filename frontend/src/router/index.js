import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Home = () => import("@/view/Home/Home");
const User = () => import("@/view/User/User");
const page404 = () => import("@/view/Page404/Page404");
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

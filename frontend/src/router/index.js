/* Layout */
import Layout from "@/layout";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: "/annotate",
        component: () => import("@/views/annotate/index"),
        meta: { title: "标注页面", icon: "edit" },
    },
    {
        path: "/login",
        component: () => import("@/views/login/index"),
        hidden: true,
    },

    {
        path: "/404",
        component: () => import("@/views/404"),
        hidden: true,
    },

    {
        path: "/",
        redirect: "/dashboard",
        component: Layout,
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: () => import("@/views/dashboard/index"),
                meta: { title: "首页", icon: "dashboard" },
            },
        ],
    },

    {
        path: "/profile",
        redirect: "profile/index",
        component: Layout,
        children: [
            {
                path: "index",
                component: () => import("@/views/profile/index"),
                name: "Profile",
                meta: { title: "个人中心", icon: "user", noCache: true },
            },
        ],
    },

    {
        path: "/table",
        component: Layout,
        children: [
            {
                path: "index",
                component: () => import("@/views/table/index"),
                name: "Table",
                meta: { title: "标注文本列表", icon: "table" },
            },
        ],
    },
    {
        path: "/errorAnalysis",
        component: Layout,
        redirect: "/errorAnalysis/fileUpload",
        name: "errorAnalysis",
        meta: { title: "错误分析", icon: "bug" },
        children: [
            {
                path: "fileUpload",
                name: "fileUpload",
                component: () => import("@/views/errorAnalysis/fileUpload"),
                meta: { title: "文件上传", icon: "el-icon-upload" },
            },
            {
                path: "text",
                name: "text",
                component: () => import("@/views/errorAnalysis/textAnalysis"),
                meta: { title: "文本分析", icon: "el-icon-notebook-2" },
            },
            {
                path: "charts",
                name: "charts",
                component: () => import("@/views/errorAnalysis/chartsAnalysis"),
                meta: { title: "图表分析", icon: "tree" },
            },
        ],
    },

    // 404 page must be placed at the end !!!
    { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes,
    });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;

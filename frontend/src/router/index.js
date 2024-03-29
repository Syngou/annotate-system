/* Layout */
import Layout from "@/layout";
import Login from "@/views/login";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/entityAnnotate",
    component: () => import("@/views/entityAnnotate/index"),
    hidden: true,
    meta: { title: "实体标注", icon: "edit" },
  },
  {
    path: "/login",
    component: Login,
    hidden: true,
    meta: { title: "登录", icon: "edit" },
  },
  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true,
    meta: { title: "注册", icon: "edit" },
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/test",
    component: () => import("@/views/test"),
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
        meta: { title: "主控台", icon: "dashboard" },
      },
    ],
  },

  {
    path: "/profile",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/views/profile/index"),
        name: "Profile",
        meta: { title: "个人中心", icon: "user", noCache: true },
      },
    ],
  },

  {
    path: "/textList",
    component: Layout,
    children: [
      {
        path: "",
        name: "textList",
        component: () => import("@/views/textList"),
        meta: { title: "文本列表", icon: "el-icon-notebook-2" },
      },
    ],
  },
  {
    path: "/labelsManage",
    component: Layout,
    children: [
      {
        path: "",
        name: "labelsManage",
        component: () => import("@/views/labelsManage"),
        meta: { title: "标签管理", icon: "el-icon-setting" },
      },
    ],
  },
  {
    path: "/groupManage",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "",
        component: () => import("@/views/groupManage/index"),
        name: "Group",
        meta: { title: "成员管理", icon: "group", noCache: true },
      },
    ],
  },
  {
    path: "/errorAnalysis",
    component: Layout,
    name: "errorAnalysis",
    meta: { title: "错误分析", icon: "bug" },
    children: [
      {
        path: "",
        name: "fileUpload",
        component: () => import("@/views/errorAnalysis/fileUpload"),
        meta: { title: "文件上传", icon: "el-icon-upload" },
      },
      {
        path: "text",
        name: "text-analysis",
        component: () => import("@/views/errorAnalysis/textAnalysis"),
        meta: { title: "文本分析", icon: "el-icon-notebook-2" },
      },
      {
        path: "charts",
        name: "charts-analysis",
        component: () => import("@/views/errorAnalysis/chartsAnalysis"),
        meta: { title: "图表分析", icon: "tree" },
      },
    ],
  },

  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
    mode: 'history',
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;

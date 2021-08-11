import { getToken } from "@/utils/auth"; // 从cookie获取令牌
import getPageTitle from "@/utils/get-page-title";
import { Message } from "element-ui";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度栏样式
import router from "../router";
import store from "../store";

NProgress.configure({ showSpinner: false }); // NProgress配置
let firstRequest = true; // 开发阶段使用，首次打开前端页面的标记
const whiteList = ["/login", "entityAnnotate", "/register", "/test"]; // 没有重定向白名单

router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start();

  // 设置页面标题
  document.title = getPageTitle(to.meta.title);

  // 确定用户是否已登录
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // 如果已登录，请重定向到主页
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.avatar;
      if (hasGetUserInfo) {
        next();
      } else {
        try {
          // 获取用户信息
          await store.dispatch("user/getInfo");
          next();
        } catch (error) {
          // 删除令牌并进入登录页面重新登录
          await store.dispatch("api/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* 没有令牌*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接进入
      next();
    } else {
      // 其他无权访问的页面将被重定向到登录页面。
      next(`/login`);
      if (!firstRequest) {
        Message.error("请先登录！");
        firstRequest = false;
      }
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // 完成进度栏
  NProgress.done();
});

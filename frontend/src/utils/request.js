import store from "@/store";
import { getToken } from "@/utils/auth";
import axios from "axios";
import { Message, MessageBox } from "element-ui";

// 创建一个axios实例
const service = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["annotate-system-token"] = getToken();
    }
    return config;
  },
  (error) => {
    // 做一些请求错误
    console.log(error); // 用于调试
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  /**
   * 通过自定义代码确定请求状态
   */
  (response) => {
    const res = response.data;

    // 如果自定义代码不是20000，则将其判断为错误。
    if (res.code !== 20000) {
      Message({
        message: res.message || "Error",
        showClose: true,
        type: "error",
        duration: 5 * 1000,
      });

      // 50008: 非法令牌； 50012：其他客户端登录； 50014：令牌已过期；
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        MessageBox.confirm(
          "您已经注销登录状态了，您可以选择取消以留在本页面，或者选择重新登录",
          "注销登录状态通知",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("api/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // 用于调试
    Message({
      message: "网络请求发生错误，请检查您的网络状态或联系管理员",
      showClose: true,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;

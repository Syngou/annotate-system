import store from "@/store";
import { getToken } from "@/utils/auth";
import axios from "axios";
import { Message, MessageBox } from "element-ui";

// 创建一个axios实例
const service = axios.create({
  baseURL: "http://localhost:8000", // url = base url + request url
  // withCredentials：true，//跨域请求时发送cookie
  timeout: 5000, // 请求超时
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    //在发送请求之前先执行一些操作

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

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果您想获取诸如标题或状态之类的http信息
   *请返回响应=>响应
   */

  /**
   * 通过自定义代码确定请求状态
   *这只是一个例子
   *您也可以通过HTTP状态代码来判断状态
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
          store.dispatch("user/resetToken").then(() => {
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

import request from "@/utils/request";
/**
 * 登录
 * @param {Object} data 登录表单
 */
export function login(data) {
  return request({
    url: "/mockjs/user/login",
    method: "post",
    data,
  });
}
/**
 * 获取用户信息
 * @param {String} token token值
 */
export function getInfo(token) {
  return request({
    url: "/mockjs/user/info",
    method: "get",
    params: { token },
  });
}
/**
 * 注销
 */
export function logout() {
  return request({
    url: "/mockjs/user/logout",
    method: "post",
  });
}

import request from "@/utils/request";

export function register(data) {
  return request({
    url: "user/register/",
    method: "post",
    data,
  });
}

/**
 * 登录
 * @param {Object} data 登录表单
 */
export function login(data) {
  return request({
    url: "user/login/",
    method: "post",
    data,
  });
}

/**
 * 获取用户信息
 * @param {String} token token值
 */
export function getInfo() {
  return request({
    url: "user/getUserInfo/",
    method: "get",
  });
}

/**
 * 注销
 */
export function logout() {
  return request({
    url: "user/logout/",
    method: "post",
  });
}

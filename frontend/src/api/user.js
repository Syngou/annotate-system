import config from "./annotateApiConfig";

export function register(data) {
  return config({
    url: "register/",
    method: "post",
    data,
  });
}

/**
 * 登录
 * @param {Object} data 登录表单
 */
export function login(data) {
  return config({
    url: "login/",
    method: "post",
    data,
  });
}

/**
 * 获取用户信息
 * @param {String} token token值
 */
export function getInfo(token) {
  return config({
    url: "getUserInfo/",
    method: "get",
    params: { token },
  });
}

/**
 * 注销
 */
export function logout() {
  return config({
    url: "logout/",
    method: "post",
  });
}

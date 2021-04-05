import request from "@/utils/request";
/**
 * @description 注册
 * @param {object} data 注册表单
 * @returns
 */
export function register(data) {
  return request({
    url: "user/register/",
    method: "post",
    data,
  });
}

/**
 * @description 登录
 * @param {object} data 登录表单
 */
export function login(data) {
  return request({
    url: "user/login/",
    method: "post",
    data,
  });
}

/**
 * @description 更新用户信息
 * @param {object} data 用户信息
 */
export function userInfoUpdate(data) {
  return request({
    url: "user/info/update/",
    method: "post",
    data,
  });
}

/**
 * @description 获取用户信息
 */
export function getInfo() {
  return request({
    url: "user/getUserInfo/",
    method: "get",
  });
}

/**
 * @description 注销
 */
export function logout() {
  return request({
    url: "user/logout/",
    method: "post",
  });
}
/**
 * @description 用户自定义的标注分类
 * @param {object} data 自定义的分类信息
 * @returns
 */
export function setClassification(data) {
  return request({
    url: "user/setClassification/",
    method: "post",
    data,
  });
}

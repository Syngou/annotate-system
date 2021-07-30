import request from "@/utils/request";
/**
 *  注册
 * @param {object} data 注册表单
 * @returns
 */
export function registerApi(data) {
  return request({
    url: "api/register/",
    method: "post",
    data,
  });
}

/**
 *  登录
 * @param {object} data 登录表单
 */
export function loginApi(data) {
  return request({
    url: "api/login/",
    method: "post",
    data,
  });
}

/**
 *  更新用户信息
 * @param {object} data 用户信息
 */
export function userInfoUpdateApi(data) {
  return request({
    url: "api/info/update/",
    method: "post",
    data,
  });
}

/**
 *  获取用户信息
 */
export function getInfoApi() {
  return request({
    url: "api/getUserInfo/",
    method: "get",
  });
}

/**
 *  注销
 */
export function logoutApi() {
  return request({
    url: "api/logout/",
    method: "post",
  });
}
/**
 *  用户自定义的标签
 * @param {object} data 自定义标签数据
 * @returns
 */
export function addLabelsApi(data) {
  return request({
    url: "api/addLabel/",
    method: "post",
    data,
  });
}

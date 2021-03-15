import request from "@/utils/request";
/**
 * 使用mockjs模拟接口
 */

export function login(data) {
  return request({
    url: "/mockjs/user/login",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/mockjs/user/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/mockjs/user/logout",
    method: "post",
  });
}

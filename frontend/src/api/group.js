import request from "@/utils/request";

/**
 * 添加成员
 * @param {object} data 成员的信息
 * @returns promise对象
 */
export function addMember(data) {
  return request({
    url: "user/addMember/",
    method: "POST",
    data,
  });
}

import request from "@/utils/request";

/**
 * 添加成员
 * @param {object} data 成员的信息
 */
export function addMemberApi(data) {
  return request({
    url: "api/addMember/",
    method: "POST",
    data,
  });
}

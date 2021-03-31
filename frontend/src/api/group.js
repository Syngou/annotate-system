import request from "@/utils/request";

export function addMember(data) {
  return request({
    url: "user/addMember/",
    method: "POST",
    data,
  });
}

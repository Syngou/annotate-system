import request from "@/utils/request";

/**
 *  获取标注文本数据
 */
export function getList() {
  return request({
    url: "/mockjs/table/list",
    method: "get",
  });
}

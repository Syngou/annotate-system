import request from "@/utils/request";

/**
 * 根据id删除一条标注文本数据
 * @param {number} id 文本的id
 */
export function deleteAnnotateText(id) {
  return request({
    url: "api/annotate_text/delete/",
    method: "DELETE",
    data: { id: id },
  });
}

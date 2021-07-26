import request from "@/utils/request";

/**
 * 根据id删除一条标注文本数据
 * @param {number} id 文本的id
 */
export function deleteAnnotateTextApi(id) {
  return request({
    url: "api/annotate_text/delete/",
    method: "DELETE",
    data: { id: id },
  });
}
/**
 * 删除该用户所有的标注文本
 * @param {object} token 该用户token
 */
export function removeAllAnnotateTextApi(token) {
  return request({
    url: "api/annotate_text/delete/",
    method: "DELETE",
    data: { token: token },
  });
}


/**
 * 更新标注文本信息
 * @param {object} textInfo 文本信息
 */
export function updateAnnotateTextInfoApi(textInfo) {
  return request({
    url: "api/annotate_text/edit/",
    method: "POST",
    data: { textInfo: textInfo },
  });
}

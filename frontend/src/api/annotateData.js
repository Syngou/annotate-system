import request from "@/utils/request";
/**
 * 添加标签
 * @param {object} labels 要添加的标签
 * @returns
 */
export function addLabelsApi(labels) {
  return request({
    url: "api/labels/add/",
    method: "POST",
    data: labels,
  });
}
/**
 * 获取标签
 */
export function getLabelsApi() {
  return request({
    url: "api/labels/get/",
  });
}
/**
 * 更新标签
 * @param {object} label 新标签信息
 * @returns
 */
export function updateLabelsApi(label) {
  return request({
    url: "api/labels/update/",
    method: "POST",
    data: label,
  });
}
/**
 * 更新标签颜色
 * @param {number}  id 标签id
 * @param {string}  color 标签颜色
 * @returns
 */
export function updateLabelColorApi(id, color) {
  return request({
    url: "api/labels/updateColor/",
    method: "POST",
    data: { id, color },
  });
}
/**
 * 删除标签
 * @param {number} id 标签id
 * @returns 
 */
export function deleteLabelApi(id) {
  return request({
    url: "api/labels/delete/",
    method: "POST",
    data: { id },
  });
}
/**
 *  标注数据上传
 * @param {object} data 需要上传的数据，
 */
export function annotateDataUploadApi(data) {
  return request({
    url: "api/annotateDataUpload/",
    method: "POST",
    data,
  });
}
/**
 *
 *  翻译
 * @param {string} text  ==> 需要标注的文本
 */
export function translateApi(text) {
  return request({
    url: `api/translate/?text=${text}`,
  });
}

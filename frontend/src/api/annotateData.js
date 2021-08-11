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

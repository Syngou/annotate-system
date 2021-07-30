import request from "@/utils/request";

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
    method: "get",
  });
}

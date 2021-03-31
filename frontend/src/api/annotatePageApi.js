import request from "@/utils/request";

/**
 *  @description 标注数据上传
 */
export function annotateDataUpload(data) {
  return request({
    url: "user/annotateDataUpload/",
    method: "POST",
    data,
  });
}
/**
 *
 * @description 翻译，待开发
 * @params text ==> 需要标注的文本
 */
export function translate(text) {
  return request({
    url: `user/translate/?text=${text}`,
    method: "get",
  });
}

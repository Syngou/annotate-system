import request from "@/utils/request";
/**
 * 暂时使用这个api配置，等后台管理的api开发完了再使用一样的配置
 */

export default {
  /**
   *
   * @description 翻译，待开发
   * @params text ==> 需要标注的文本
   */
  translate(text) {
    return request({
      url: `user/translate/?text=${text}`,
      method: "get",
    });
  },
};

import config from "./tempConfig";
/**
 *  获取标注文本数据
 */
export function getList() {
  return config({
    url: "/mockjs/table/list",
    method: "get",
  });
}

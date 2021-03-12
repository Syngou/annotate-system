import request from "@/utils/request";

/**
 * 获取文本分析数据
 * @returns 文本分析数据
 */
export function getText() {
    return request({
        url: "/mockjs/error/text",
        method: "get",
    });
}

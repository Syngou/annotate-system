import request from "@/utils/request";

export function getText(params) {
    return request({
        url: "/mockjs/error/text",
        method: "get",
        params,
    });
}

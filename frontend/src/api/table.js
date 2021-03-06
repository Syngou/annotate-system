import request from "@/utils/request";

export function getList(params) {
    return request({
        url: "/mockjs/table/list",
        method: "get",
        params,
    });
}

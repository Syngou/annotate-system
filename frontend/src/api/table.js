import request from "@/utils/request";

export function getList(params) {
    return request({
        url: "/annotate-system/table/list",
        method: "get",
        params,
    });
}

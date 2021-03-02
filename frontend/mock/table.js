const Mock = require("mockjs");

const data = Mock.mock({
    "items|30": [
        {
            id: "@id",
            title: "@ctitle",
            "status|1": ["已完成", "未完成"],
            author: "@cname",
            display_time: "@datetime",
            pageViews: "@integer(300, 5000)",
        },
    ],
});

module.exports = [
    {
        url: "/annotate-system/table/list",
        type: "get",
        response: (config) => {
            const items = data.items;
            return {
                code: 20000,
                data: {
                    total: items.length,
                    items: items,
                },
            };
        },
    },
];

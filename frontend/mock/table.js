const Mock = require("mockjs");

const data = Mock.mock({
    "items|30": [
        {
            id: "@id",
            title: "@ctitle",
            "status|1": ["已完成", "未完成"],
            author: "@cname",
            paragraph: "@cparagraph(300)",
        },
    ],
});

module.exports = [
    {
        url: "/mockjs/table/list",
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

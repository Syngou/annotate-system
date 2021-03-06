const Mock = require("mockjs");

const data = Mock.mock({
    data: {
        "text|17": ["@cparagraph(10)"],
        "annotations|17": [
            [
                {
                    start_offset: 10,
                    standardType: 4,
                    predictType: 7,
                },
                {
                    start_offset: 11,
                    standardType: 4,
                    predictType: 7,
                },
                {
                    start_offset: 12,
                    standardType: 6,
                    predictType: 7,
                },
                {
                    start_offset: 14,
                    standardType: 7,
                    predictType: 7,
                },
                {
                    start_offset: 22,
                    standardType: 4,
                    predictType: 7,
                },
                {
                    start_offset: 33,
                    standardType: 7,
                    predictType: 6,
                },
                {
                    start_offset: 44,
                    standardType: 7,
                    predictType: 5,
                },
                {
                    start_offset: 61,
                    standardType: 4,
                    predictType: 6,
                },
                {
                    start_offset: 73,
                    standardType: 4,
                    predictType: 7,
                },
                {
                    start_offset: 95,
                    standardType: 6,
                    predictType: 6,
                },
            ],
        ],
    },
});

module.exports = [
    {
        url: "/mockjs/error/text",
        type: "get",
        response: () => {
            const items = data.data;
            return {
                code: 20000,
                data: {
                    items,
                },
            };
        },
    },
];

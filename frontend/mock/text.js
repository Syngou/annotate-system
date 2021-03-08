const Mock = require("mockjs");

module.exports = [
    {
        url: "/mockjs/error/text",
        type: "get",
        response: () => {
            let result = [];
            for (let i = 0; i < 15; i++) {
                result.push(
                    Mock.mock(
                        "@pick(['药物','医生','器械','地点','关系','疾病','患者','治疗方法','病毒','元素'])"
                    )
                );
            }
            let temp = [];
            for (let i = 0; i < 50; i++) {
                temp.push(
                    Mock.mock({
                        start_offset: Math.ceil(Math.random() * 200),
                        standard_type:
                            result[Math.floor(Math.random() * result.length)],
                        predict_type:
                            result[Math.floor(Math.random() * result.length)],
                        standard_label: '@pick(["B","I","O"])',
                        predict_label: '@pick(["B","I","O"])',
                    })
                );
            }
            return {
                code: 20000,
                data: Mock.mock({
                    labels: result,
                    "text|17": ["@cparagraph(10)"],
                    "annotations|17": [temp],
                }),
            };
        },
    },
];

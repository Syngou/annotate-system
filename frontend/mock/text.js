const Mock = require("mockjs");

module.exports = [
    {
        url: "/mockjs/error/text",
        type: "get",
        response: () => {
            let temp = [];
            let result = [];
            for (let i = 0; i < 15; i++) {
                temp.push(
                    Mock.mock(
                        "@pick(['药物','医生','器械','地点','关系','疾病','患者','治疗方法','病毒','元素'])"
                    )
                );
            }
            for (let i = 0; i < temp.length; i++) {
                if (temp.indexOf(temp[i]) === i) {
                    result.push({ text: temp[i] });
                }
            }
            temp = [];
            let annotations = [];
            for (let i = 0; i < 5; i++) {
                let text = Mock.mock("@cparagraph(10)");
                for (let j = 0; j < text.length; j++) {
                    temp.push({
                        value: text[j],
                        standard_type:
                            result[Math.floor(Math.random() * result.length)]
                                .text,
                        predict_type:
                            result[Math.floor(Math.random() * result.length)]
                                .text,
                        standard_label: ["B", "I", "O"][
                            Math.floor(Math.random() * 3)
                        ],
                        predict_label: ["B", "I", "O"][
                            Math.floor(Math.random() * 3)
                        ],
                    });
                }
                annotations.push(temp);
                temp = [];
            }

            return {
                code: 20000,
                data: Mock.mock({
                    labels: result,
                    annotations: annotations,
                }),
            };
        },
    },
];

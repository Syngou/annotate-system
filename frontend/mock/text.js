const Mock = require("mockjs");

let colorArray = [
    //标签颜色
    "#fa0404",
    "#fd0dad",
    "#8406f3",
    "#d462ee",
    "#ff9b06",
    "#e3fc07",
    "#058f32",
    "#10f0fc",
    "#83fa07",
    "#e6ee66",
    "#c0e97d",
    "#aae77d",
    "#2e0bf3",
    "#0af0e1",
    "#0baff5",
    "#1f74c9",
    "#8985ec",
    "#761616",
];
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
            let index = 0;
            for (let i = 0; i < temp.length; i++) {
                if (temp.indexOf(temp[i]) === i) {
                    result.push({
                        text: temp[i],
                        color: colorArray[index++],
                    });
                }
            }
            return {
                code: 20000,
                data: Mock.mock({
                    labels: result,
                    "text|17": ["@cparagraph(10)"],
                    "annotations|17": [
                        [
                            {
                                start_offset: 10,
                                standardType: 4,
                                predictType: 7,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 11,
                                standardType: 4,
                                predictType: 7,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 14,
                                standardType: 7,
                                predictType: 7,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 17,
                                standardType: 6,
                                predictType: 7,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 18,
                                standardType: 6,
                                predictType: 7,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 22,
                                standardType: 4,
                                predictType: 7,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 23,
                                standardType: 6,
                                predictType: 7,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 33,
                                standardType: 6,
                                predictType: 7,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },

                            {
                                start_offset: 36,
                                standardType: 7,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 44,
                                standardType: 7,
                                predictType: 5,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 45,
                                standardType: 6,
                                predictType: 7,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },

                            {
                                start_offset: 46,
                                standardType: 6,
                                predictType: 7,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },

                            {
                                start_offset: 48,
                                standardType: 4,
                                predictType: 7,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 50,
                                standardType: 6,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 61,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 71,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 81,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 83,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 84,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 85,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 161,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 101,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 123,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 134,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 125,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 143,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 178,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 135,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 178,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 149,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 138,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                            {
                                start_offset: 179,
                                standardType: 4,
                                predictType: 6,
                                standard_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ].text,
                                standard_label: '@pick(["B","I","O"])',
                                predict_label: '@pick(["B","I","O"])',
                            },
                        ],
                    ],
                }),
            };
        },
    },
];

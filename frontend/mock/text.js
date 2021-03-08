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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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
                                    ],
                                predict_type:
                                    result[
                                        Math.floor(
                                            Math.random() * result.length
                                        )
                                    ],
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

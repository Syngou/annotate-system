(function (t) {
    function e(e) {
        for (
            var r, i, s = e[0], l = e[1], c = e[2], p = 0, u = [];
            p < s.length;
            p++
        )
            (i = s[p]),
                Object.prototype.hasOwnProperty.call(n, i) &&
                    n[i] &&
                    u.push(n[i][0]),
                (n[i] = 0);
        for (r in l)
            Object.prototype.hasOwnProperty.call(l, r) && (t[r] = l[r]);
        d && d(e);
        while (u.length) u.shift()();
        return a.push.apply(a, c || []), o();
    }
    function o() {
        for (var t, e = 0; e < a.length; e++) {
            for (var o = a[e], r = !0, s = 1; s < o.length; s++) {
                var l = o[s];
                0 !== n[l] && (r = !1);
            }
            r && (a.splice(e--, 1), (t = i((i.s = o[0]))));
        }
        return t;
    }
    var r = {},
        n = { app: 0 },
        a = [];
    function i(e) {
        if (r[e]) return r[e].exports;
        var o = (r[e] = { i: e, l: !1, exports: {} });
        return t[e].call(o.exports, o, o.exports, i), (o.l = !0), o.exports;
    }
    (i.m = t),
        (i.c = r),
        (i.d = function (t, e, o) {
            i.o(t, e) ||
                Object.defineProperty(t, e, { enumerable: !0, get: o });
        }),
        (i.r = function (t) {
            "undefined" !== typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module",
                }),
                Object.defineProperty(t, "__esModule", { value: !0 });
        }),
        (i.t = function (t, e) {
            if ((1 & e && (t = i(t)), 8 & e)) return t;
            if (4 & e && "object" === typeof t && t && t.__esModule) return t;
            var o = Object.create(null);
            if (
                (i.r(o),
                Object.defineProperty(o, "default", {
                    enumerable: !0,
                    value: t,
                }),
                2 & e && "string" != typeof t)
            )
                for (var r in t)
                    i.d(
                        o,
                        r,
                        function (e) {
                            return t[e];
                        }.bind(null, r)
                    );
            return o;
        }),
        (i.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                          return t["default"];
                      }
                    : function () {
                          return t;
                      };
            return i.d(e, "a", e), e;
        }),
        (i.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (i.p = "/");
    var s = (window["webpackJsonp"] = window["webpackJsonp"] || []),
        l = s.push.bind(s);
    (s.push = e), (s = s.slice());
    for (var c = 0; c < s.length; c++) e(s[c]);
    var d = l;
    a.push([0, "chunk-vendors"]), o();
})({
    0: function (t, e, o) {
        t.exports = o("56d7");
    },
    "56d7": function (t, e, o) {
        "use strict";
        o.r(e);
        o("e623"), o("e379"), o("5dc8"), o("37e1");
        var r = o("bc3a"),
            n = o.n(r),
            a = o("f825"),
            i = o.n(a),
            s = (o("f8ce"), o("2b0e")),
            l = function () {
                var t = this,
                    e = t.$createElement,
                    o = t._self._c || e;
                return o("div", { attrs: { id: "app" } }, [
                    o(
                        "div",
                        {
                            staticClass: "topNavigation",
                            staticStyle: { "margin-bottom": "20px" },
                        },
                        [
                            o("span", [
                                o("span", { staticClass: "title" }, [
                                    t._v("Text Annotation System"),
                                ]),
                                o(
                                    "a",
                                    {
                                        attrs: { href: "#" },
                                        on: {
                                            click: function (e) {
                                                t.introduce_modal = !0;
                                            },
                                        },
                                    },
                                    [t._v("功能介绍")]
                                ),
                                o(
                                    "a",
                                    {
                                        attrs: {
                                            href:
                                                "https://github.com/Syngou/txtProcess",
                                            target: "_blank",
                                        },
                                    },
                                    [t._v("Github")]
                                ),
                                o(
                                    "a",
                                    {
                                        staticStyle: { float: "right" },
                                        attrs: { href: "#" },
                                        on: {
                                            click: function (e) {
                                                t.login_modal = !0;
                                            },
                                        },
                                    },
                                    [t._v("登录")]
                                ),
                            ]),
                            o(
                                "Modal",
                                {
                                    model: {
                                        value: t.login_modal,
                                        callback: function (e) {
                                            t.login_modal = e;
                                        },
                                        expression: "login_modal",
                                    },
                                },
                                [
                                    o(
                                        "Form",
                                        {
                                            ref: "formInline",
                                            attrs: {
                                                model: t.formInline,
                                                rules: t.ruleInline,
                                                block: "",
                                            },
                                        },
                                        [
                                            o(
                                                "FormItem",
                                                { attrs: { prop: "user" } },
                                                [
                                                    o(
                                                        "i-Input",
                                                        {
                                                            attrs: {
                                                                type: "text",
                                                                placeholder:
                                                                    "Username",
                                                            },
                                                            model: {
                                                                value:
                                                                    t.formInline
                                                                        .user,
                                                                callback: function (
                                                                    e
                                                                ) {
                                                                    t.$set(
                                                                        t.formInline,
                                                                        "user",
                                                                        e
                                                                    );
                                                                },
                                                                expression:
                                                                    "formInline.user",
                                                            },
                                                        },
                                                        [
                                                            o("Icon", {
                                                                attrs: {
                                                                    slot:
                                                                        "prepend",
                                                                    type:
                                                                        "ios-person-outline",
                                                                },
                                                                slot: "prepend",
                                                            }),
                                                        ],
                                                        1
                                                    ),
                                                ],
                                                1
                                            ),
                                            o(
                                                "FormItem",
                                                { attrs: { prop: "password" } },
                                                [
                                                    o(
                                                        "i-Input",
                                                        {
                                                            attrs: {
                                                                type:
                                                                    "password",
                                                                placeholder:
                                                                    "Password",
                                                            },
                                                            model: {
                                                                value:
                                                                    t.formInline
                                                                        .password,
                                                                callback: function (
                                                                    e
                                                                ) {
                                                                    t.$set(
                                                                        t.formInline,
                                                                        "password",
                                                                        e
                                                                    );
                                                                },
                                                                expression:
                                                                    "formInline.password",
                                                            },
                                                        },
                                                        [
                                                            o("Icon", {
                                                                attrs: {
                                                                    slot:
                                                                        "prepend",
                                                                    type:
                                                                        "ios-lock-outline",
                                                                },
                                                                slot: "prepend",
                                                            }),
                                                        ],
                                                        1
                                                    ),
                                                ],
                                                1
                                            ),
                                        ],
                                        1
                                    ),
                                    o(
                                        "p",
                                        {
                                            staticStyle: {
                                                color: "#f60",
                                                "text-align": "center",
                                            },
                                            attrs: { slot: "header" },
                                            slot: "header",
                                        },
                                        [o("span", [t._v("Login")])]
                                    ),
                                    o(
                                        "div",
                                        {
                                            staticStyle: {
                                                display: "flex",
                                                "justify-content": "center",
                                                "align-items": "center",
                                            },
                                            attrs: { slot: "footer" },
                                            slot: "footer",
                                        },
                                        [
                                            o(
                                                "Button",
                                                {
                                                    attrs: { type: "primary" },
                                                    on: {
                                                        click: function (e) {
                                                            return t.handleSubmit(
                                                                "formInline"
                                                            );
                                                        },
                                                    },
                                                },
                                                [t._v("Signin")]
                                            ),
                                        ],
                                        1
                                    ),
                                ],
                                1
                            ),
                            o(
                                "Modal",
                                {
                                    attrs: { title: "功能介绍" },
                                    model: {
                                        value: t.introduce_modal,
                                        callback: function (e) {
                                            t.introduce_modal = e;
                                        },
                                        expression: "introduce_modal",
                                    },
                                },
                                [
                                    o("p", [
                                        t._v(
                                            "按下鼠标，滑过文本，松开，即可标注文本"
                                        ),
                                    ]),
                                ]
                            ),
                        ],
                        1
                    ),
                    o("div", { staticClass: "row" }, [
                        o("div", { staticClass: "leftColumn" }, [
                            o(
                                "div",
                                { staticClass: "card" },
                                [
                                    o(
                                        "h2",
                                        {
                                            staticStyle: {
                                                "margin-top": "20px",
                                            },
                                        },
                                        [t._v("输入")]
                                    ),
                                    o(
                                        "Dropdown",
                                        {
                                            staticStyle: {
                                                "margin-left": "20px",
                                                "margin-top": "20px",
                                            },
                                        },
                                        [
                                            o(
                                                "a",
                                                {
                                                    attrs: {
                                                        href:
                                                            "javascript:void(0)",
                                                    },
                                                },
                                                [
                                                    t._v(" 功能 "),
                                                    o("Icon", {
                                                        attrs: {
                                                            type:
                                                                "ios-arrow-down",
                                                        },
                                                    }),
                                                ],
                                                1
                                            ),
                                            o(
                                                "DropdownMenu",
                                                {
                                                    attrs: { slot: "list" },
                                                    slot: "list",
                                                },
                                                [
                                                    o("DropdownItem", [
                                                        t._v("待开发"),
                                                    ]),
                                                    o("DropdownItem", [
                                                        t._v("待开发"),
                                                    ]),
                                                    o(
                                                        "DropdownItem",
                                                        {
                                                            attrs: {
                                                                disabled: "",
                                                            },
                                                        },
                                                        [t._v("待开发")]
                                                    ),
                                                    o("DropdownItem", [
                                                        t._v("待开发"),
                                                    ]),
                                                    o(
                                                        "DropdownItem",
                                                        {
                                                            attrs: {
                                                                divided: "",
                                                            },
                                                        },
                                                        [t._v("待开发")]
                                                    ),
                                                ],
                                                1
                                            ),
                                        ],
                                        1
                                    ),
                                    o(
                                        "Dropdown",
                                        {
                                            staticStyle: {
                                                "margin-left": "20px",
                                            },
                                        },
                                        [
                                            o(
                                                "a",
                                                {
                                                    attrs: {
                                                        href:
                                                            "javascript:void(0)",
                                                    },
                                                },
                                                [
                                                    t._v(" 翻译 "),
                                                    o("Icon", {
                                                        attrs: {
                                                            type:
                                                                "ios-arrow-down",
                                                        },
                                                    }),
                                                ],
                                                1
                                            ),
                                            o(
                                                "DropdownMenu",
                                                {
                                                    attrs: { slot: "list" },
                                                    slot: "list",
                                                },
                                                [
                                                    o("DropdownItem", [
                                                        t._v("待开发"),
                                                    ]),
                                                    o("DropdownItem", [
                                                        t._v("待开发"),
                                                    ]),
                                                    o(
                                                        "DropdownItem",
                                                        {
                                                            attrs: {
                                                                disabled: "",
                                                            },
                                                        },
                                                        [t._v("待开发")]
                                                    ),
                                                    o("DropdownItem", [
                                                        t._v("待开发"),
                                                    ]),
                                                    o(
                                                        "DropdownItem",
                                                        {
                                                            attrs: {
                                                                divided: "",
                                                            },
                                                        },
                                                        [t._v("待开发")]
                                                    ),
                                                ],
                                                1
                                            ),
                                        ],
                                        1
                                    ),
                                    o(
                                        "Dropdown",
                                        {
                                            staticStyle: {
                                                "margin-left": "20px",
                                            },
                                        },
                                        [
                                            o(
                                                "a",
                                                {
                                                    attrs: {
                                                        href:
                                                            "javascript:void(0)",
                                                    },
                                                },
                                                [
                                                    t._v(" 工具 "),
                                                    o("Icon", {
                                                        attrs: {
                                                            type:
                                                                "ios-arrow-down",
                                                        },
                                                    }),
                                                ],
                                                1
                                            ),
                                            o(
                                                "DropdownMenu",
                                                {
                                                    attrs: { slot: "list" },
                                                    slot: "list",
                                                },
                                                [
                                                    o("DropdownItem", [
                                                        t._v("待开发"),
                                                    ]),
                                                    o("DropdownItem", [
                                                        t._v("待开发"),
                                                    ]),
                                                    o(
                                                        "DropdownItem",
                                                        {
                                                            attrs: {
                                                                disabled: "",
                                                            },
                                                        },
                                                        [t._v("待开发")]
                                                    ),
                                                    o("DropdownItem", [
                                                        t._v("待开发"),
                                                    ]),
                                                    o(
                                                        "DropdownItem",
                                                        {
                                                            attrs: {
                                                                divided: "",
                                                            },
                                                        },
                                                        [t._v("待开发")]
                                                    ),
                                                ],
                                                1
                                            ),
                                        ],
                                        1
                                    ),
                                    o(
                                        "div",
                                        {
                                            ref: "article",
                                            on: { click: t.annotation },
                                        },
                                        [
                                            o("p", [
                                                t._v(
                                                    " 【摘要】目的通过介绍临床药师参与临床抗感染多学科协作诊疗(MDT)的实例，为临床药师更好地参与临床提供参考。方法选取典型病例，介绍临床药师参与抗感染治疗的方案讨论、制定及调整，并进行分析总结。结果临床药师在抗感染MDT中给予合理建议，患者病情得到有效控制。结论临床药师运用自己的专业知识，为临床医师提供合理化用药建议，提高患者的整体治疗质量。 "
                                                ),
                                            ]),
                                            o("p", [
                                                t._v(
                                                    "【关键词】抗感染;临床药师;多学科协作诊疗"
                                                ),
                                            ]),
                                            o("p", [
                                                t._v(
                                                    " 多学科协作诊疗(multidisciplinaryteam，MDT)是一种新型的临床治疗模式，是指针对一个临床疾病，通过多学科的讨论，制定最合理的规范化、个体化治疗，从而提高患者的治愈率和生存质量。2018年，原国家卫生计生委在《关于印发进一步改善医疗服务行动计划(2018至2020年)的通知》中要求医疗机构针对肿瘤、多系统多器官疾病、疑难复杂疾病等，建立多学科病例讨论和联合查房相关制度，为住院患者提供多学科诊疗服务［1］。苏州大学附属太仓医院于2017年成立了抗菌药物管理小组，针对感染性疾病建立了MDT团队。本文通过介绍临床药师参与的典型感染性病例讨论，对患者抗感染治疗中抗菌药物使用情况进行回顾性分析，并提出优化后续抗感染治疗方案的建议与分析，以探究临床药师在抗感染MDT团队中的作用。现报道如下。 "
                                                ),
                                            ]),
                                            o("p", [
                                                t._v(
                                                    "1参与多重耐药菌感染治疗方案的制定"
                                                ),
                                            ]),
                                            o("p", [t._v("1．1病历资料")]),
                                            o("p", [
                                                t._v(
                                                    " 患者，女，58岁，因“发现肝硬化3年余，腹胀10d”于2018年7月30日入院。患者有甲状腺功能减退症、再生障碍性贫血、双下肢丹毒史，有青霉素过敏史。入院查体:T37．2℃，P114次/min，R20次/min，BP114/68mmHg。神志清，颈软，双肺呼吸音粗，未闻及干湿啰音，心律齐，腹软，下腹部膨隆，全腹无压痛及反跳痛，肝脾肋下未及，移动性浊音阳性，双下肢水肿，右脚足背皮肤发红。腹部B超:血吸虫肝病表现，门静脉海绵样变;胆囊结石，胆囊炎;脾肿大;腹腔积液。诊断肝硬化失代偿期、自身免疫性肝炎、甲状腺功能减退症、再生障碍性贫血、丹毒。患者入院当天下午出现高热，T39．8℃，右下肢疼痛不适，血常规示白细胞计数3．8×109/L，中性粒细胞0．88;C反应蛋白84mg/L;降钙素原1．01ng/ml。外科会诊考虑丹毒再发，予以莫西沙星0．4g静脉滴注每天1次。8月3日血培养提示大肠埃希菌(+)，第3、4代头孢菌素类、氟喹诺酮类耐药，换用美罗培南1g静脉滴注，每8小时1次。之后病情无明显好转，为进一步诊治，于2018年8月7日提请全院MDT。 "
                                                ),
                                            ]),
                                            o("p", [t._v("1．2临床药师建议")]),
                                            o("p", [
                                                t._v(
                                                    " 患者既往有丹毒病史，此次入院丹毒再发，伴肺部感染，高热，血培养提示大肠埃希菌+，首选碳青霉烯类药物抗感染，但患者已予美罗培南1g静脉滴注每8小时1次治疗4d，体温控制不佳，建议加用氨基糖苷类联合治疗。 "
                                                ),
                                            ]),
                                            o("p", [t._v("1．3MDT结果")]),
                                            o("p", [
                                                t._v(
                                                    " 根据多科室意见，患者发热与丹毒、肺部感染相关，起因为患者肝硬化失代偿的基础，但需排除腹腔内感染灶，建议痰培养，同时行下肢病灶局部超声检查了解是否存在脓肿病灶，治疗上在美罗培南基础上加用氨基糖苷类药物。 1．4后续跟踪 "
                                                ),
                                            ]),
                                            o("p", [
                                                t._v(
                                                    " 根据MDT结果，加用依替米星0．2g静脉滴注每天1次。3d后回访，患者热峰呈下降趋势。10d后复查血培养阴性，T37．5℃左右，抗菌药物降阶梯为头孢西丁2g静脉滴注每12小时1次，后感染症状逐渐好转。 1．5抗感染治疗方案分析 "
                                                ),
                                            ]),
                                            o("p", [
                                                t._v(
                                                    " 肠杆菌科细菌是临床细菌感染性疾病中最重要的致病菌，而超广谱β-内酰胺酶(ESBLs)是肠杆菌科细菌对β-内酰胺类抗菌药物产生耐药的主要机制。ESBLs可水解灭活青霉素类、氧亚氨基头孢菌素(包括第3、4代头孢菌素)及单环酰胺类氨曲南，通常不水解头霉素类和碳青霉烯类，其活性可被β-内酰胺酶抑制剂抑制。针对这类细菌引起的重症感染，专家共识［2］推荐碳青霉烯类是最有效和可靠的抗菌药物。同时提出重症感染、存在合并非发酵菌感染危险因素的患者可联合用药。该患者重症感染，使用美罗培南4d后病情好转不明显，考虑感染不易控制，故联合应用氨基糖苷类抗菌药物。经上述药物治疗后，患者病情明显好转，血培养阴性、临床症状改善后予以头霉素类降阶梯治疗。 2规范抗菌药物的使用 "
                                                ),
                                            ]),
                                            o("p", [t._v("2．1病历资料")]),
                                            o("p", [
                                                t._v(
                                                    " 患者，男，67岁，因“颈部脓肿切开术后20d”于2019年2月3日入院。患者1月15日入住上海某院诊断颈部脓肿，行颈部脓肿切开引流术，术后抗炎对症治疗，2月3日颈部分泌物培养提示耐甲氧西林金黄色葡萄球菌(MRSA)，患者要求转当地医院继续治疗，上海出院医嘱建议万古霉素+美罗培南抗感染治疗。患者有哮喘病史30余年。入院查体:T36．9℃，P98次/min，R18次/min，BP122/92mmHg，神志清，颈部敷料清洁，颈前套管在位，双肺呼吸音清，未闻及明显干湿啰音。入院后给予万古霉素1g+美罗培南0．5g静脉滴注每天2次。患者2月11日出现夜间端坐呼吸，双肺听诊可及散在湿性啰音，胸部CT:双肺多发模糊影，广泛粟粒结节灶;两侧胸腔积液。血常规:白细胞计数4．6×109/L，中性粒细胞0.67;血浆D-二聚体1730μg/L;血气分析:pH值7．46，PaO290mmHg，PaCO262mmHg，氧饱和度97%;脑钠肽(BNP)1303pg/ml。为进一步诊治，于2019年2月15日提请全院MDT。 "
                                                ),
                                            ]),
                                        ]
                                    ),
                                ],
                                1
                            ),
                        ]),
                        t._m(0),
                    ]),
                    t._m(1),
                ]);
            },
            c = [
                function () {
                    var t = this,
                        e = t.$createElement,
                        o = t._self._c || e;
                    return o("div", { staticClass: "rightColumn" }, [
                        o(
                            "button",
                            {
                                staticClass: "float-right1",
                                attrs: { id: "float-right-name" },
                            },
                            [t._v("0")]
                        ),
                        o(
                            "button",
                            {
                                staticClass: "float-right2",
                                attrs: { id: "float-right-relations" },
                            },
                            [t._v("0")]
                        ),
                        o(
                            "button",
                            {
                                staticClass: "float-right3",
                                attrs: { id: "float-right-medicine" },
                            },
                            [t._v("0")]
                        ),
                        o(
                            "button",
                            {
                                staticClass: "float-right4",
                                attrs: { id: "float-right-tools" },
                            },
                            [t._v("0")]
                        ),
                        o(
                            "div",
                            {
                                staticClass: "card",
                                staticStyle: { "margin-top": "40px" },
                            },
                            [
                                o("h1", [
                                    t._v(" 关系 "),
                                    o(
                                        "span",
                                        {
                                            staticStyle: {
                                                color: "rgb(255, 117, 24)",
                                            },
                                            attrs: { id: "name" },
                                        },
                                        [t._v("0")]
                                    ),
                                ]),
                                o("label", [t._v("自定义颜色")]),
                                o("input", {
                                    attrs: {
                                        type: "color",
                                        onchange:
                                            "changeColor(this,'relations-color');",
                                    },
                                }),
                                o("div", [
                                    o(
                                        "textarea",
                                        { attrs: { id: "relations-color" } },
                                        [t._v("大小")]
                                    ),
                                ]),
                            ]
                        ),
                        o("div", { staticClass: "card" }, [
                            o("h1", [
                                t._v(" 疾病名称 "),
                                o(
                                    "span",
                                    {
                                        staticStyle: {
                                            color: "rgb(255, 117, 24)",
                                        },
                                        attrs: { id: "name" },
                                    },
                                    [t._v("0")]
                                ),
                            ]),
                            o("label", [t._v("自定义颜色")]),
                            o("input", {
                                attrs: {
                                    type: "color",
                                    onchange: "changeColor(this,'name-color');",
                                },
                            }),
                            o("div", [
                                o("textarea", { attrs: { id: "name-color" } }, [
                                    t._v("手足口病"),
                                ]),
                            ]),
                        ]),
                        o("div", { staticClass: "card" }, [
                            o("h1", [
                                t._v("药物 "),
                                o(
                                    "span",
                                    {
                                        staticStyle: { color: "red" },
                                        attrs: { id: "medicine" },
                                    },
                                    [t._v("0")]
                                ),
                            ]),
                            o("label", [t._v("自定义颜色")]),
                            o("input", {
                                attrs: {
                                    type: "color",
                                    onchange:
                                        "changeColor(this,'medicine-color')",
                                },
                            }),
                            o("div", [
                                o(
                                    "textarea",
                                    { attrs: { id: "medicine-color" } },
                                    [t._v("板蓝根")]
                                ),
                            ]),
                        ]),
                        o("div", { staticClass: "card" }, [
                            o("h1", [
                                t._v("医疗器械 "),
                                o(
                                    "span",
                                    {
                                        staticStyle: { color: "red" },
                                        attrs: { id: "tools" },
                                    },
                                    [t._v("0")]
                                ),
                            ]),
                            o("label", [t._v("自定义颜色")]),
                            o("input", {
                                attrs: {
                                    type: "color",
                                    onchange: "changeColor(this,'tools-color')",
                                },
                            }),
                            o("div", [
                                o(
                                    "textarea",
                                    { attrs: { id: "tools-color" } },
                                    [t._v("担架")]
                                ),
                            ]),
                        ]),
                    ]);
                },
                function () {
                    var t = this,
                        e = t.$createElement,
                        o = t._self._c || e;
                    return o("div", { staticClass: "footer" }, [
                        o("p", [t._v("copyright © 2020 Syngou")]),
                    ]);
                },
            ],
            d =
                (o("a15b"),
                o("d3b7"),
                o("ac1f"),
                o("25f0"),
                o("1276"),
                {
                    data: function () {
                        return {
                            index: 0,
                            login_modal: !1,
                            introduce_modal: !1,
                            formInline: { user: "", password: "" },
                            ruleInline: {
                                user: [
                                    {
                                        required: !0,
                                        message: "Please fill in the user name",
                                        trigger: "blur",
                                    },
                                ],
                                password: [
                                    {
                                        required: !0,
                                        message: "Please fill in the password.",
                                        trigger: "blur",
                                    },
                                    {
                                        type: "string",
                                        min: 6,
                                        message:
                                            "The password length cannot be less than 6 bits",
                                        trigger: "blur",
                                    },
                                ],
                            },
                        };
                    },
                    methods: {
                        k: function () {
                            this.$Message.info("Clicked ok");
                        },
                        cancel: function () {
                            this.$Message.info("Clicked cancel");
                        },
                        annotation: function () {
                            for (
                                var t = this.$refs.article.getElementsByTagName(
                                        "p"
                                    ),
                                    e = [],
                                    o = 0;
                                o < t.length;
                                o++
                            )
                                e.push(t[o].innerHTML);
                            var r = window.getSelection().toString();
                            if (r.length > 0) {
                                for (var n = 0; n < t.length; n++) {
                                    var a = t[n],
                                        i = e[n],
                                        s = (i || "").split(r),
                                        l = ["red", "blue", "aqua", "orange"],
                                        c = s.join(
                                            "<span style='color:" +
                                                l[this.index] +
                                                "'>" +
                                                r +
                                                "</span>"
                                        );
                                    a.innerHTML = c;
                                }
                                (this.index += 1),
                                    this.index >= 4 && (this.index = 0),
                                    console.log(
                                        "name->",
                                        name,
                                        "index->",
                                        this.index
                                    );
                            }
                        },
                        handleSubmit: function (t) {
                            var e = this;
                            this.$refs[t].validate(function (t) {
                                t
                                    ? e.$Message.success("Success!")
                                    : e.$Message.error("Fail!");
                            });
                        },
                    },
                }),
            p = d,
            u = (o("e9ee"), o("2877")),
            v = Object(u["a"])(p, l, c, !1, null, "bb874fec", null),
            f = v.exports;
        (s["default"].prototype.$axios = n.a),
            (s["default"].config.productionTip = !1),
            s["default"].use(i.a),
            (s["default"].config.devtools = !0),
            new s["default"]({
                el: "#app",
                render: function (t) {
                    return t(f);
                },
            }).$mount("#app");
    },
    "5d79": function (t, e, o) {},
    e9ee: function (t, e, o) {
        "use strict";
        o("5d79");
    },
});
//# sourceMappingURL=app.284b8052.js.map

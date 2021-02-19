const Mock = require("mockjs");

Mock.mock(/\/login/, "post", {
    code: 20000,
    msg: "login",
});
Mock.mock(/\/upload/, "get", {
    code: 20000,
    msg: "upload",
});
Mock.mock(/\/translate/, "get", {
    code: 20000,
    msg: "translate",
    "result|1": ["linux", "windows", "mac", "android"],
});

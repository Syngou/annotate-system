"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _layout = _interopRequireDefault(require("@/layouts/layout"));

var _Home = _interopRequireDefault(require("@/view/Home"));

var _User = _interopRequireDefault(require("@/view/User/User"));

var _Page = _interopRequireDefault(require("@/view/Page404/Page404"));

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

_vue["default"].use(_vueRouter["default"]);

var _default = new _vueRouter["default"]({
  routes: [
    {
      path: "/",
      component: _layout["default"],
      children: [
        {
          path: "/",
          component: _Home["default"],
          exact: true,
        },
        {
          path: "/user",
          component: _User["default"],
        },
        {
          path: "*",
          component: _Page["default"],
        },
      ],
    },
  ],
});

exports["default"] = _default;

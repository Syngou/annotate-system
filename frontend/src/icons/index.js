import SvgIcon from "@/components/SvgIcon"; // svg component
import Vue from "vue";

// 全局注册组件
Vue.component("SvgIcon", SvgIcon);

const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);

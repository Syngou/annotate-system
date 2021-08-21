const state = {
  // TODO 是不是也可以自定义颜色
  colorArray: [
    // 错误分析标签颜色
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
  ],
  entity_type: [], // 实体分类
  line_graph: [], //折线图数据
  bar_graph: {}, // 柱形图数据
  sentences: {}, // 文本分析数据
};

const mutations = {
  SET_DATA(state, { entity_type, line_graph, bar_graph, sentences }) {
    state.entity_type = entity_type;
    state.line_graph = line_graph;
    state.bar_graph = bar_graph;
    state.sentences = sentences;
  },
};

const actions = {
  setData({ commit }, data) {
    commit("SET_DATA", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

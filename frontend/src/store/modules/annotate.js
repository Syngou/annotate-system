// 用户标注设置
const state = {
  labels: [
    // 标签信息
  ],
  // 存储已标注的词语
  entityAnnotateData: [[], [], [], [], [], []],
  // 文本id
  essayId: 0,
  // 按钮id，用于查找，添加删除事件
  id: 1,
  // 当前文本内容
  annotateText: `还没有设置标注文本哦`,
};

const mutations = {
  /**
   *  将标注文本添加列表，并上传至后台
   * @param  state
   * @param  info 对象，存id和文本
   */
  ADD_TO_LIST: (state, info) => {
    const entityAnnotateData = info.entityAnnotateData;
    const index = parseInt(info.id.split("-")[0]);
    state.entityAnnotateData[index].push(entityAnnotateData);
  },
  /**
   *  删除list中的标注记录
   * @param  state
   * @param  info 对象，存储需要删除已标注文本的id，文本
   */
  DELETE_DATA_FROM_LIST: (state, info) => {
    const index = parseInt(info.type.split("-")[0]);
    for (let i = state.entityAnnotateData.length - 1; i >= 0; i--) {
      if (
        state.entityAnnotateData[index][i] &&
        state.entityAnnotateData[index][i].id === info.type.split("-")[1]
      ) {
        state.entityAnnotateData[index].splice(i, 1);
        break;
      }
    }
  },
  /**
   *  设置标注标签
   * @param {*} state
   */
  SET_LABELS: (state, data) => {
    state.labels = data;
    state.entityAnnotateData = [];
    const length = state.labels.length;
    for (let i = 0; i < length; i++) {
      state.entityAnnotateData.push([]);
    }
  },

  /**
   *  设置标注文本
   */
  SET_ANNOTATE_TEXT: (state, text) => {
    state.annotateText = text.trim(); // TODO 这里要不要trim()呢？
  },
};

const actions = {
  addToList({ commit }, info) {
    commit("ADD_TO_LIST", info);
  },
  deleteDataFromList({ commit }, info) {
    commit("DELETE_DATA_FROM_LIST", info);
  },
  setLabels({ commit }, data) {
    commit("SET_LABELS", data);
  },

  setTextTitle({ commit }, title) {
    commit("SET_TEXT_TITLE", title);
  },
  setAnnotateText({ commit }, text) {
    commit("SET_ANNOTATE_TEXT", text);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

const getters = {
  sidebar: (state) => state.app.sidebar, //侧边栏
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  annotateTextList: (state) => state.user.annotateTextList,
  classification: (state) => state.annotate.classification, //分类信息
  annotateData: (state) => state.annotate.annotateData, //标注数据
};
export default getters;

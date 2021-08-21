const getters = {
  sidebar: (state) => state.app.sidebar, //侧边栏
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  annotateTextList: (state) => state.user.annotateTextList,
  labels: (state) => state.annotate.labels, //标签信息
  entityAnnotateData: (state) => state.annotate.entityAnnotateData, //标注数据
};
export default getters;

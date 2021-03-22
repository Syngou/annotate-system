const getters = {
  sidebar: (state) => state.app.sidebar, //侧边栏
  device: (state) => state.app.device, //设备是电脑还是手机
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  institution: (state) => state.user.institution,
  account: (state) => state.user.account,
  phone: (state) => state.user.phone,
  typesInfo: (state) => state.annotate.typesInfo, //分类信息
  annotateData: (state) => state.annotate.annotateData, //标注数据
};
export default getters;

const getters = {
    sidebar: (state) => state.app.sidebar,
    device: (state) => state.app.device,
    token: (state) => state.user.token,
    avatar: (state) => state.user.avatar,
    name: (state) => state.user.name,
    roles: (state) => state.user.roles,
    institution: (state) => state.user.institution,
};
export default getters;

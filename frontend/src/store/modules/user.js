import { getInfo, login, logout, register } from "@/api/user";
import { resetRouter } from "@/router";
import { getToken, removeToken, setToken } from "@/utils/auth";

const state = {
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],
    // 所有的标注文本
    annotateTextList: [],
};

const mutations = {
    //token
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    //用户名
    SET_NAME: (state, name) => {
        state.name = name;
    },
    //头像
    SET_AVATAR: (state, avatar) => {
        state.avatar =
            avatar ?? "https://w.wallhaven.cc/full/nr/wallhaven-nrjgy7.jpg";
    },
    //角色，用于权鉴
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
    /**
     * 设置所有的标注文本
     */
    SET_ANNOTATE_TEXT_LIST: (state, annotateTextList) => {
        // TODO 暂时这样添加,等数据库完善后再更改

        state.annotateTextList = annotateTextList;
    },
};

const actions = {
    // 用户登录
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password })
                .then((response) => {
                    const { data } = response;
                    commit("SET_TOKEN", data.token);
                    setToken(data.token);

                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    // 注册
    register({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            register({ username: username.trim(), password: password })
                .then((response) => {
                    const { data } = response;
                    commit("SET_TOKEN", data.token);
                    setToken(data.token);

                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    // 获取用户信息
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo()
                .then((response) => {
                    const { data } = response;
                    console.log("data ==> ", data);

                    if (!data) {
                        reject("验证失败，请再次登录。");
                    }

                    const { roles, name, avatar, annotate_text_list } = data;

                    // 角色必须是非空数组
                    if (!roles || roles.length <= 0) {
                        reject("getInfo：角色必须是非空数组！");
                    }

                    commit("SET_ROLES", roles);
                    commit("SET_NAME", name);
                    commit("SET_AVATAR", avatar);

                    commit("SET_ANNOTATE_TEXT_LIST", annotate_text_list);
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    // 用户注销
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token)
                .then(() => {
                    commit("SET_TOKEN", "");
                    commit("SET_ROLES", []);
                    commit("SET_AVATAR", "");
                    removeToken();
                    resetRouter();

                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    // 删除令牌
    resetToken({ commit }) {
        return new Promise((resolve) => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve();
        });
    },
    // 设置头像
    setAvatar({ commit }, avatar) {
        commit("SET_AVATAR", avatar);
    },
    // 设置用户名
    setName({ commit }, name) {
        commit("SET_NAME", name);
    },
    setAnnotateTextList({ commit }, textList) {
        commit("SET_ANNOTATE_TEXT_LIST", textList);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};

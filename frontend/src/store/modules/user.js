import { getInfo, login, logout } from "@/api/user";
import router, { resetRouter } from "@/router";
import { getToken, removeToken, setToken } from "@/utils/auth";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  institution: "",
  roles: [],
  phone: "",
  account: "",
};

const mutations = {
  //token
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  //介绍
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  //用户名
  SET_NAME: (state, name) => {
    state.name = name;
  },
  //头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  //角色，用于权鉴
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  //机构，工作单位
  SET_INSTITUTION: (state, institution) => {
    state.institution = institution;
  },
  //手机号
  SET_PHONE: (state, phone) => {
    state.phone = phone;
  },
  //账号
  SET_ACCOUNT: (state, account) => {
    state.account = account;
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

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            reject("验证失败，请再次登录。");
          }

          const {
            roles,
            name,
            avatar,
            introduction,
            institution,
            phone,
            account,
          } = data;

          // 角色必须是非空数组
          if (!roles || roles.length <= 0) {
            reject("getInfo：角色必须是非空数组！");
          }

          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);
          commit("SET_INSTITUTION", institution);
          commit("SET_PHONE", phone);
          commit("SET_ACCOUNT", account);
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

  // 动态修改权限
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token";

    commit("SET_TOKEN", token);
    setToken(token);

    const { roles } = await dispatch("getInfo");

    resetRouter();

    // 根据角色生成可访问的路线图
    const accessRoutes = await dispatch(
      "permission/generateRoutes",
      roles,
      { root: true }
    );
    // 动态添加可访问的路线
    router.addRoutes(accessRoutes);

    // 重置访问的视图和缓存的视图
    dispatch("tagsView/delAllViews", null, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

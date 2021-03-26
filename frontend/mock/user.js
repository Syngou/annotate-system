const tokens = {
  admin: {
    token: "admin-token",
  },
  editor: {
    token: "editor-token",
  },
};

const users = {
  "admin-token": {
    account: 182,
    roles: ["管理员"],
    introduction: "I am a super administrator",
    avatar: "https://w.wallhaven.cc/full/nr/wallhaven-nrjgy7.jpg",
    institution: "xx单位",
    phone: "18888888888",
    name: "Syngou",
  },
  "editor-token": {
    roles: ["普通用户"],
    introduction: "I am an editor",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    institution: "xx医院",
    name: "linus",
  },
};

module.exports = [
  // 用户登录
  {
    url: "/mockjs/user/login",
    type: "post",
    response: (config) => {
      const { username } = config.body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: "帐户和密码不正确。",
        };
      }

      return {
        code: 20000,
        data: token,
      };
    },
  },

  // 获取用户信息
  {
    url: "/mockjs/user/info.*",
    type: "get",
    response: (config) => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: "登录失败，无法获取用户详细信息。",
        };
      }

      return {
        code: 20000,
        data: info,
      };
    },
  },

  //用户注销
  {
    url: "/mockjs/user/logout",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: "success",
      };
    },
  },
];

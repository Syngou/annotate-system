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
        roles: ["超级管理员"],
        introduction: "I am a super administrator",
        avatar: "https://w.wallhaven.cc/full/nr/wallhaven-nrjgy7.jpg",
        institution: "xx医院",
        name: "Syngou",
    },
    "editor-token": {
        roles: ["管理员"],
        introduction: "I am an editor",
        avatar:
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        institution: "xx医院",
        name: "Syngou",
    },
};

module.exports = [
    // user login
    {
        url: "/vue-admin-template/user/login",
        type: "post",
        response: (config) => {
            const { username } = config.body;
            const token = tokens[username];

            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: "Account and password are incorrect.",
                };
            }

            return {
                code: 20000,
                data: token,
            };
        },
    },

    // get user info
    {
        url: "/vue-admin-template/user/info.*",
        type: "get",
        response: (config) => {
            const { token } = config.query;
            const info = users[token];

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: "Login failed, unable to get user details.",
                };
            }

            return {
                code: 20000,
                data: info,
            };
        },
    },

    // user logout
    {
        url: "/vue-admin-template/user/logout",
        type: "post",
        response: (_) => {
            return {
                code: 20000,
                data: "success",
            };
        },
    },
];

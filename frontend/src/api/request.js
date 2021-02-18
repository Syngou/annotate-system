import config from "./config";

export default {
    /**
     *
     * @param  name ==> 用户名
     * @param  password ==> 密码
     * @description 登录，请自行更改请求url
     */
    login(name, password) {
        return config({
            url: "login",
            method: "POST",
            data: { name, password },
        });
    },

    /**
     *
     * @description 传数据到后台
     * @param  data ==> 数组，四个值对应四个标注的属性
     */
    postToBackend(data) {
        return config({
            url: `upload?relation=${data[0]}&name=${data[1]}&medicine=${data[2]}&tool=${data[3]}`,
            method: "GET",
        });
    },

    /**
     *
     * @description 翻译，待开发
     * @params text ==> 需要标注的文本
     */
    translate(text) {
        return config({
            url: `translate/${text}`,
            method: "get",
        });
    },
};

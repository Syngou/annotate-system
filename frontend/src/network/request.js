import axios from "axios";

export default {
    /**
     *
     * @param  name ==> 用户名
     * @param  password ==> 密码
     * @description 登录，请自行更改请求url
     */
    login(name, password) {
        return axios.post(
            // TODO：等待服务器
            "http://localhost:8000/",
            { name, password }
        );
    },

    /**
     *
     * @description 传数据到后台
     * @param  data ==> 数组，四个值对应四个标注的属性
     */
    postToBackend(data) {
        const instance = axios.create({
            baseURL: `http://localhost:8000/sql?relation=${data[0]}&name=${data[1]}&medicine=${data[2]}&tool=${data[3]}`,
            timeout: 5000,
        });
        return instance(data);
    },
    /**
     *
     * @description 翻译，待开发
     * @params text ==> 需要标注的文本
     */
    translate(text) {
        const instance = axios.create({
            baseURL: `http://localhost:8000/translate?text=${text}`,
            timeout: 5000,
        });
        return instance();
    },
};

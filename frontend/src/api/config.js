import axios from "axios";
import { Message } from "element-ui";

//配置
const service = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000,
});

//响应拦截器
service.interceptors.response.use(
    (response) => {
        let res = response.data;
        //状态码为20000表示成功
        if (res.code !== 20000) {
            Message({
                type: "error",
                message: res.message || "Error",
                duration: 3 * 1000,
            });
        } else {
            return res;
        }
    },
    (error) => {
        Message({
            message: "网络请求发生错误，请检查您的网络状态或联系管理员",
            type: "error",
            duration: 3 * 1000,
        });
        return Promise.reject(error);
    }
);

export default service;

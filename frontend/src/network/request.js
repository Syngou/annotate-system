import axios from "axios";

/**
 
 * @description 登录
 * @param  name 用户名
 * @param  password 密码
 * TODO 这样可能不安全，或许需要改一下
 */
export function login(name, password) {
    const instance = axios.create({
        // TODO：等待服务器
        baseURL: "http://localhost:8000/loginServlet",
        params: { name, password },
        timeout: 5000,
    });
    return instance();
}

/**
 * @description 传数据到后台
 * @param  data 数组，对应四个标注的属性
 */
export function postToBackend(data) {
    const instance = axios.create({
        baseURL: `http://localhost:8000/sql?relation=\
            ${data[0]}&name=${data[1]}&medicine=${data[2]}&tool=${data[3]}`,
        timeout: 5000,
    });
    return instance(data);
}

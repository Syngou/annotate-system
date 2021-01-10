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
 
 * @description 添加数据,想使用redis存数据的可以调用
 * @param  key 键
 * @param  field 域
 * @param  value 值
 */
export function addToRedis(key, field, value) {
    const instance = axios.create({
        baseURL: "http://localhost:8000/update",
        params: { action: "add", key, field, value },
        timeout: 5000,
    });
    return instance();
}
/**
 * @description 删除数据,想使用redis存数据的可以调用
 * @param  key 键
 * @param  field 域
 */
export function deleteFromRedis(key, field) {
    const instance = axios.create({
        baseURL: "http://localhost:8000/update",
        params: { action: "del", key, field },
        timeout: 5000,
    });
    return instance();
}
/**
 * @description 传数据到后台
 * @param  params 数组，对应四个标注的属性
 */
export function postToBackend(params) {
    const instance = axios.create({
        baseURL:
            "http://localhost:8000/sql?relation=" +
            params[0] +
            "&name=" +
            params[1] +
            "&medicine=" +
            params[2] +
            "&tool=" +
            params[3],
        timeout: 5000,
    });
    return instance(params);
}

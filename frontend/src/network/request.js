import axios from "axios";

export function request() {
    const instance = axios.create({
        // TODO：等待服务器
        baseURL: "http://localhost:8080",
        timeout: 5000,
    });
    return instance();
}

export function addToDatabase(key, field, value) {
    const instance = axios.create({
        baseURL:
            "http://localhost:8000/update?action=add&key=" +
            key +
            "&field=" +
            field +
            "&value=" +
            value,
        timeout: 5000,
    });
    return instance();
}

export function delFromDatabase(key, field) {
    const instance = axios.create({
        baseURL:
            "http://localhost:8000/update?action=del&key=" +
            key +
            "&field=" +
            field,
        timeout: 5000,
    });
    return instance();
}

export function postToDatabase(params) {
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

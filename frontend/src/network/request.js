import axios from "axios";

export function request() {
  const instance = axios.create({
    // TODO：等待服务器
    baseURL: "http://localhost:8080",
    timeout: 5000,
  });
  return instance();
}

export function addToRedis(key, field, value) {
  const instance = axios.create({
    baseURL: "http://localhost:8000/update",
    params: {action: "add", key, field, value},
    timeout: 5000,
  });
  return instance();
}

export function deleteFromRedis(key, field) {
  const instance = axios.create({
    baseURL: "http://localhost:8000/update",
    params: {action: "del", key, field},
    timeout: 5000,
  });
  return instance();
}

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

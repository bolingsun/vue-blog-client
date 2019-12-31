import axios from "axios";
// import store from "@/store";
// import { getToken } from "@/utils/auth";

// 创建axios实例
const service = axios.create({
  // baseURL: "http://localhost:3000",
  // baseURL: process.env.url_api, // 生成环境正式的服务器地址(build时候打开)
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000 // 请求超时时间设置
});

// request 拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   // 让每个请求携带token
    //   // ['X-Token'] 未自定义key
    //   config.headers["token"] = getToken();
    // }
    config.headers["x-token"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTA0ODAwMDY2M2IyYjM1MGNkODU5ZWEiLCJpYXQiOjE1Nzc3MDQ4MDcsImV4cCI6MTU3NzcxMjAwN30.JrLUx52_FzUXFR1b6KZ11i62s0LfZ7KBiaHTeOUtBk8";
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  // response => response, // 如果需要返回http信息譬如头部信息或状态，就使用该方式
  response => {
    const res = response.data;
    // 如果返回后端定义的code不是 1 ，就视为一个错误返回.
    if (res.status !== 1) {
      console.log(res.errMsg || "Error");
      // Message({
      //   message: res.errMsg || "Error",
      //   type: "error",
      //   duration: 1 * 1000
      // });
      // if (
      //   res.errCode === "err.token.outtime" ||
      //   res.errCode === "err.token.invalid"
      // ) {
      //   // token超时、过期
      //   store.dispatch("user/resetToken").then(() => {
      //     location.reload();
      //   });
      // }
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;

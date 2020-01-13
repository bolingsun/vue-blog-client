import request from "@/utils/request";
// 用户登录
export function login(data) {
  return request({
    url: "/api/auth/local/login",
    method: "post",
    data
  });
}
// 获取用户信息详情
export function getInfo(query) {
  return request({
    url: "/api/user/getInfo",
    method: "get",
    params: query
  });
}
// 普通用户注册
export function register(data) {
  return request({
    url: "/api/user/register",
    method: "post",
    data
  });
}
// export function logout(data) {
//   return request({
//     url: "/auth/local/logout",
//     method: "post",
//     data
//   });
// }

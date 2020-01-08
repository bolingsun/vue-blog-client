import request from "@/utils/request";
// 博客文章新增
export function login(data) {
  return request({
    url: "/auth/local/login",
    method: "post",
    data
  });
}
// 普通用户注册
export function register(data) {
  return request({
    url: "/user/register",
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

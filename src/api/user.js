import request from "@/utils/request";
// 博客文章新增
export function login(data) {
  return request({
    url: "/auth/local/login",
    method: "post",
    data
  });
}

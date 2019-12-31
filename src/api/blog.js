import request from "@/utils/request";
// 博客文章新增
export function articleAdd(data) {
  return request({
    url: "/article/addArticle",
    method: "post",
    data
  });
}

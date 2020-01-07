import request from "@/utils/request";
// 博客文章新增
export function articleAdd(data) {
  return request({
    url: "/article/addArticle",
    method: "post",
    data
  });
}
// 博客文章获取列表（前台展示）
export function articleList(query) {
  return request({
    url: "/article/articleList",
    method: "get",
    params: query
  });
}
// 上传图片
export function upload(data) {
  return request({
    url: "/upload",
    method: "post",
    data
  });
}

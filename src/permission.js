import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth"; // 从cookie中拿去token
router.beforeEach((to, from, next) => {
  const hasToken = getToken();
  if (hasToken) {
    /* 有token */
    if (to.path === "/login/index") {
      // 有token,请求的是登录页面,直接返回首页
      next({ path: "/home" });
    } else {
      next();
    }
  } else {
    /* 无token */
    if (to.meta.requireAuth) {
      // 该路由需要登录权限
      if (store.state.user.token) {
        // vuex state中获取到当前的token是否存在
        next();
      } else {
        next({
          path: "/login"
          // query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      }
    } else {
      // 该路由不需要登录权限
      next();
    }
  }
});

import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth"; // 从cookie中拿去token
router.beforeEach((to, from, next) => {
  // 要离开页面如果设置为不滚回到顶部，则本页是要记住上滚动高度到vuex中，以便下次进来恢复高度
  if (from.meta.scrollToTop == false) {
    store.dispatch("app/changeScrollTop", document.documentElement.scrollTop);
  }
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
router.afterEach(to => {
  // 如果进入后的页面是要滚动到顶部，则设置scrollTop = 0
  //否则从vuex中读取上次离开本页面记住的高度，恢复它
  if (to.meta.scrollToTop == true) {
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
    }, 10);
  } else {
    setTimeout(() => {
      document.documentElement.scrollTop = store.state.app.scrollTop;
    }, 50);
  }
});

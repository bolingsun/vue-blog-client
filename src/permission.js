import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth"; // 从cookie中拿去token
import Message from "@/components/Message";
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  if (hasToken) {
    /* 有token */
    if (to.path === "/login/index") {
      // 有token,请求的是登录页面,直接返回首页
      next({ path: "/home" });
    } else {
      const hasRole = store.getters.role;
      if (hasRole) {
        next();
      } else {
        try {
          const { role } = await store.dispatch("user/getInfo");
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            [role]
          );
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          // 移除 token，跳转登录页重新登录
          await store.dispatch("user/resetToken");
          Message.message({
            type: "error",
            message: "获取用户信息失败，请重新登录"
          });
          console.log(error);
          next({ path: "/login" });
        }
      }
    }
  } else {
    /* 无token */
    // 没有token,意味没有登录。如果vuex中的路由表为空，就需要调用设置默认路由，这样路由菜单才有东西可以渲染展示。
    if (store.state.permission.routes.length === 0) {
      store.dispatch("permission/generateDefaulRotes");
    }
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

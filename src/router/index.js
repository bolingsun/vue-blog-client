import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

/* 布局 */
import Layout from "@/layout";

/**
 * 常规路由，不需要权限角色判断
 * icon: 菜单栏图表
 * title： 菜单栏标题
 */
export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: {
      icon: "mdi-home",
      title: "首页"
    },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/Home.vue")
      }
    ]
  },
  {
    path: "/login",
    component: Layout,
    meta: {
      icon: "mdi-account-circle",
      title: "登录"
    },
    redirect: "/login/index",
    children: [
      {
        path: "index",
        name: "Login",
        component: () => import("@/views/Login.vue")
      }
    ]
  },
  {
    path: "/register",
    component: Layout,
    hidden: true,
    meta: {
      icon: "mdi-home",
      title: "注册"
    },
    redirect: "/register/index",
    children: [
      {
        path: "index",
        name: "Register",
        component: () => import("@/views/Register.vue")
      }
    ]
  },
  {
    path: "/article-detail",
    component: Layout,
    hidden: true,
    meta: {
      icon: "mdi-home",
      title: "文章详情"
    },
    redirect: "/article-detail/index",
    children: [
      {
        path: "index",
        name: "ArticleDetail",
        component: () => import("@/views/ArticleDetail.vue")
      }
    ]
  },
  {
    path: "/contact-me",
    component: Layout,
    meta: {
      icon: "mdi-contact-mail",
      title: "Contact"
    },
    redirect: "/contact-me/index",
    children: [
      {
        path: "index",
        name: "ContactMe",
        component: () => import("@/views/ContactMe.vue")
      }
    ]
  }
];
/**
 * 动态路由
 * 需要角色判断
 * icon: 菜单栏图表
 * title： 菜单栏标题
 * roles:[], 需要的角色权限类别，admin或是user
 */
export const asyncRoutes = [
  {
    path: "/article-edit",
    component: Layout,
    meta: {
      icon: "mdi-home",
      title: "文章编辑",
      roles: ["admin"]
    },
    redirect: "/article-edit/index",
    children: [
      {
        path: "index",
        name: "ArticleEdit",
        meta: {
          requireAuth: true // requireAuth表示需要登录
        },
        component: () => import("@/views/ArticleEdit.vue")
      }
    ]
  }
];
const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    routes: constantRoutes
  });
const router = createRouter();
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}
export default router;

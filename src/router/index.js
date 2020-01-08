import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

/* 布局 */
import Layout from "@/layout";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/Home.vue")
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/About.vue")
      }
    ]
  },
  {
    path: "/login",
    component: Layout,
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
    path: "/article-edit",
    component: Layout,
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
  },
  {
    path: "/article-detail",
    component: Layout,
    redirect: "/article-detail/index",
    children: [
      {
        path: "index",
        name: "ArticleDetail",
        meta: {},
        component: () => import("@/views/ArticleDetail.vue")
      }
    ]
  }
  // {
  //   path: "/",
  //   name: "home",
  //   component: Home
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;

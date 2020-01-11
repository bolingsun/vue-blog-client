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
        component: () => import("@/views/ArticleDetail.vue")
      }
    ]
  },
  {
    path: "/contact-me",
    component: Layout,
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
const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    routes: routes
  });
const router = createRouter();
export default router;

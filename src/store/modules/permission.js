import { asyncRoutes, constantRoutes } from "@/router";

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      // if (tmp.children) {
      //   tmp.children = filterAsyncRoutes(tmp.children, roles);
      // }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  // 登录后计算路由菜单（静态路由+动态路由筛选）
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes;
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      // console.log("动态", accessedRoutes);
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  },
  // 没有登陆时，路由菜单设置为静态路由。
  generateDefaulRotes({ commit }) {
    return new Promise(resolve => {
      commit("SET_ROUTES", []);
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

import { login, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  role: ""
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  }
};

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { email, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ email: email, password: password })
        .then(response => {
          commit("SET_TOKEN", response.token);
          setToken(response.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response;
          if (!data) {
            reject("验证失败，请重新登录");
          }
          let name = "";
          if (data.nickname) {
            name = data.nickname;
          } else if (data.username) {
            name = data.username;
          } else {
            name = data.email;
          }
          // const { roles, name, avatar, introduction } = data
          let role = data.role;
          let avatar = data.avatar ? data.avatar : "";
          commit("SET_ROLE", role);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 用户退出登录
  logout({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
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

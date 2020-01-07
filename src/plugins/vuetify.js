import Vue from "vue";
import Vuetify from "vuetify/lib";
// import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#607D8B", // 深灰
        secondary: "#CFD8DC", // 浅灰
        accent: "#F8BBD0", // 淡粉
        error: "#FF5252", // 红色
        info: "#2196F3", // 蓝色
        success: "#4CAF50", // 绿色
        warning: "#F9AA33" // 黄色
      }
    }
  }
});

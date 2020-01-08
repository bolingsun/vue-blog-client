import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission"; // permission control
import vuetify from "./plugins/vuetify";

// vue quill 编辑器
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor);

// 代码高亮，取消，会导致文本输入框卡顿
// import hljs from "highlight.js";
// import "highlight.js/styles/atom-one-dark.css";
// Vue.directive("highlight", function(el) {
//   let blocks = el.querySelectorAll("pre");
//   blocks.forEach(block => {
//     hljs.highlightBlock(block);
//   });
// });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

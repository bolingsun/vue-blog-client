<template>
  <v-app>
    <!-- 侧边抽屉 -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link @click="linkToHome">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>首页</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="linkToLogin">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>登录</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="linkToEdit">
          <v-list-item-action>
            <v-icon>mdi-folder-edit-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>文章编辑</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- 顶部工具栏 -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="handleLogOut">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- 中间内容区 -->
    <v-content class="white">
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <v-footer>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Layout",
  components: {},
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    // 退出登录
    async handleLogOut() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    linkToHome() {
      this.$router.push({ name: "Home" });
    },
    linkToLogin() {
      this.$router.push({ path: "/login" });
    },
    linkToEdit() {
      this.$router.push({ path: "/article-edit" });
    }
  }
};
</script>
<style lang="scss">
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

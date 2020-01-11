<template>
  <v-app>
    <!-- 侧边抽屉 -->
    <v-navigation-drawer v-model="drawer" app>
      <template v-slot:prepend>
        <v-list-item v-show="infoShow" two-line>
          <v-list-item-avatar>
            <img :src="avatar ? avatar : defaultAvatar" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
            <v-list-item-subtitle>{{ role | roleFilter }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list dense>
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </v-list>
      <!-- <v-list dense>
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
        <v-list-item link @click="linkToContact">
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
      </v-list> -->
    </v-navigation-drawer>
    <!-- 顶部工具栏 -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>MyBlog</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="handleLogOut">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- 中间内容区 -->
    <v-content class="white">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view :key="key"></router-view>
        </keep-alive>
      </transition>
      <!-- vue2.1.0之前的版本方法 -->
      <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="key"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" :key="key"></router-view> -->
      <!-- 模式2需要history模式 -->
      <!-- <transition name="fade-transform" mode="out-in">
        <keep-alive :include="['Home']">
          <router-view></router-view>
        </keep-alive>
      </!-->
    </v-content>
    <v-footer>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import SidebarItem from "./SidebarItem";
import { mapGetters } from "vuex";
export default {
  name: "Layout",
  components: {
    SidebarItem
  },
  data() {
    return {
      drawer: false,
      defaultAvatar: require("../assets/avatar.png")
    };
  },
  filters: {
    roleFilter(role) {
      if (role === "admin") {
        return "管理员";
      } else {
        return "普通用户";
      }
    }
  },
  computed: {
    ...mapGetters(["avatar", "name", "role", "permission_routes"]),
    key() {
      return this.$route.path;
    },
    infoShow() {
      if (this.name) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    // console.log(this.permission_routes);
  },
  methods: {
    // 退出登录
    async handleLogOut() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      this.$message({
        type: "success",
        message: "退出成功"
      });
    }
  }
  // activated() {
  // },
  // deactivated() {
  // }
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

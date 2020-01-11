<template>
  <v-container fluid>
    <v-card max-width="800" class="mx-auto">
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">Kevin Sun</v-list-item-title>
          <v-list-item-subtitle>Web前端开发工程师</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
        height="194"
      ></v-img>

      <v-card-text>
        <div>现居：深圳</div>
        <div>Email: 624143101@qq.com</div>
      </v-card-text>

      <v-card-actions>
        <v-btn fab dark small depressed color="cyan" @click="showQQ = !showQQ">
          <v-icon>mdi-qqchat</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          depressed
          color="cyan"
          @click="showWexin = !showWexin"
        >
          <v-icon>mdi-wechat</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div>
          <div v-show="showQQ">
            <v-divider></v-divider>
            <v-card-text>
              I'm a QQ
            </v-card-text>
          </div>
          <div v-show="showWexin">
            <v-divider></v-divider>
            <v-card-text>
              I'm a WeChart
            </v-card-text>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Contactme",
  components: {},
  data() {
    return {
      showQQ: false,
      showWexin: false
    };
  }
};
</script>

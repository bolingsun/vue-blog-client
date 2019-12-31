<template>
  <!-- <div class="home">
  </div> -->
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="pa-2" outlined tile>
          <article-list></article-list>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-card class="pa-2" outlined tile>
          <menu-info></menu-info>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import ArticleList from "@/views/ArticleList.vue";
import MenuInfo from "@/views/MenuInfo.vue";

export default {
  name: "home",
  components: {
    ArticleList,
    MenuInfo
  }
};
</script>

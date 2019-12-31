<template>
  <v-container fluid>
    <v-card class="mx-auto" outlined>
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>Alberto Savoia Can Teach You About Interior</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">
        <v-icon>mdi-clock-outline</v-icon>
        2019-12-12 9:10
        <v-icon>mdi-comment-multiple-outline</v-icon>
        23
        <v-icon>mdi-cryengine</v-icon>
        42
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrude consectetur adipisicing elit, sed do
          eiusmod tempor incididunt.
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="grey" outlined>
          CONTINIU READING
        </v-btn>
      </v-card-actions>
    </v-card>

    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="15"
        :total-visible="7"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "ArticleList",
  components: {},
  data() {
    return {
      page: 1
    };
  }
};
</script>

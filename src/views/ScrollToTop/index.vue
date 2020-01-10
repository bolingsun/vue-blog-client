<template>
  <v-btn
    v-show="isShowTop"
    class="mx-2 gotop float-right"
    fab
    dark
    small
    color="teal"
    @click.prevent="gotop"
  >
    <v-icon>mdi-arrow-up-bold</v-icon>
  </v-btn>
</template>
<script>
export default {
  data() {
    return {
      isShowTop: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 200) {
        this.isShowTop = true;
      } else {
        this.isShowTop = false;
      }
    },
    gotop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>
<style lang="scss">
.gotop {
  position: fixed;
  right: 2%;
  bottom: 5vh;
  z-index: 999;
}
</style>

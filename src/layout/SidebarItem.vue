<template>
  <v-list-item v-if="!item.hidden" link @click="linkTo(item)">
    <v-list-item-action>
      <v-icon>{{ item.meta.icon }}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "SidebarItem",
  components: {},
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    linkTo(item) {
      this.$router.push({ path: item.path });
    }
  }
};
</script>

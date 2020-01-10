<template>
  <v-container fluid>
    <!-- <v-card class="mx-auto" outlined>
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
    </v-card> -->
    <v-row>
      <v-col v-for="(item, index) in articles" :key="index" :xs="12" :md="6">
        <v-card class="mx-auto" outlined>
          <v-img
            class="white--text align-end"
            height="200px"
            :src="
              item.cover_img
                ? item.cover_img
                : 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
            "
          >
            <v-card-title>
              <span>{{ item.title }}</span>
            </v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            <v-icon>mdi-clock-outline</v-icon>
            {{ item.publish_time | formatDate }}
            <v-icon>mdi-comment-processing-outline</v-icon>
            {{ item.comment_count }}
            <v-icon>mdi-eye-outline</v-icon>
            {{ item.visit_count }}
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>
              {{ item.brief }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="grey" outlined @click="handleRead(item)">
              点击阅读
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="length"
        @input="handleClickNum"
        @previous="handlePrev"
        @next="handleNextClick"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { articleList } from "@/api/blog";
export default {
  name: "ArticleList",
  components: {},
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 1,
      length: 1,
      articles: []
    };
  },
  computed: {
    // length() {
    //   return this.total / this.pageSize;
    // }
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  created() {
    this.fetchList();
  },
  mounted() {},
  activated() {
    // console.log(this.$route);
    // 需要刷新，keepalive不应该生效
    if (this.$route.params.reload && this.$route.params.reload === true) {
      this.fetchList();
    }
    // console.log(this.$store.state.app.scrollTop);
    document.documentElement.scrollTop = this.$store.state.app.scrollTop;
  },
  methods: {
    fetchList() {
      let para = {
        currentPage: this.page,
        pageSize: this.pageSize
      };
      articleList(para)
        .then(res => {
          // console.log(res);
          this.articles = [...res.data];
          this.length = Math.ceil(res.total / this.pageSize);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRead(v) {
      // console.log(document.body.scrollTop);
      // console.log(document.documentElement.scrollTop);
      this.$store.dispatch(
        "app/changeScrollTop",
        document.documentElement.scrollTop
      );
      this.$router.push({
        path: "/article-detail/index",
        query: { id: v._id }
      });
    },
    // 点击分页数字
    handleClickNum() {
      this.fetchList();
      this.$store.dispatch("app/changeScrollTop", 0);
      document.documentElement.scrollTop = 0;
    },
    // 下一页
    handleNextClick() {
      this.fetchList();
      this.$store.dispatch("app/changeScrollTop", 0);
      document.documentElement.scrollTop = 0;
    },
    // 上一页
    handlePrev() {
      this.fetchList();
      this.$store.dispatch("app/changeScrollTop", 0);
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

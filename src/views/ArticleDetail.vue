<template>
  <v-container fluid>
    <!-- 标题 -->
    <div class="d-flex justify-center">
      <div class="title font-weight-bold">{{ title }}</div>
    </div>
    <div class="caption mb-2">
      <span class="mr-2">发布于{{ publish_time | formatDate }}</span>
      <span class="mr-2">阅读{{ visit_count }}</span>
      <span class="mr-2">喜欢{{ like_count }}</span>
    </div>
    <!-- 内容 -->
    <div class="body-1" v-html="content"></div>
    <v-divider></v-divider>
    <!-- 评论 -->
    <div class="mt-2 mb-2">目前{{ comment_count }}条评论</div>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="item in commentList"
        :key="item.title"
        class="d-flex flex-column align-start mb-4 grey lighten-5"
      >
        <div class="subtitle-2">{{ item.user_id.username }}说道：</div>
        <div class="pl-10">
          <div class="caption">{{ item.created | formatDate }}</div>
          <div class="body-2 mb-2">{{ item.content }}</div>
          <div v-if="item.replys.length > 0">
            <div
              v-for="(reply, index) in item.replys"
              :key="index"
              class="mb-2"
            >
              <div class="subtitle-2">
                {{ reply.user_info.username }}回复: @{{ item.user_id.username }}
              </div>
              <div class="caption">{{ reply.created | formatDate }}</div>
              <div class="body-2">{{ reply.content }}</div>
            </div>
          </div>
        </div>
      </v-list-item>
    </v-list>
    <div v-if="user">
      <v-textarea
        outlined
        name="input-7-4"
        label="Outlined textarea"
        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
      ></v-textarea>
      <div class="d-flex justify-center">
        <v-btn block color="secondary">提交</v-btn>
      </div>
    </div>
    <div v-else class="d-flex justify-center">
      <v-btn color="secondary">登录后发表评论</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AtricleDetail",
  components: {},
  data() {
    return {
      title: "我是标题",
      content: "<p>我是内容，你看一下</p>",
      visit_count: 2,
      comment_count: 1,
      like_count: 1,
      publish_time: "2020-01-05T02:43:25.346Z",
      commentList: [
        {
          content: "我是new comment内容",
          user_id: {
            _id: "5e048000663b2b350cd859ea",
            username: "user2"
          },
          created: "2020-01-05T06:42:08.411Z",
          replys: [
            {
              _id: "5e1190325286b03be84765df",
              content: "你这个评论批量",
              user_info: {
                id: "5e047f0ce862981008597673",
                username: "admin"
              },
              created: "2020-01-05T07:28:50.515Z"
            },
            {
              _id: "5e1190325286b03be84765df",
              content: "你这个就说好说话",
              user_info: {
                id: "5e047f0ce862981008597673",
                username: "admin"
              },
              created: "2020-01-05T07:28:50.515Z"
            }
          ]
        },
        {
          content: "我是comment2内容",
          user_id: {
            _id: "5e048000663b2b350cd859ea",
            username: "user3"
          },
          created: "2020-01-05T06:42:08.411Z",
          replys: [
            {
              _id: "5e1190325286b03be84765df",
              content: "回复comment2",
              user_info: {
                id: "5e047f0ce862981008597673",
                username: "user2"
              },
              created: "2020-01-05T07:28:50.515Z"
            }
          ]
        }
      ],
      user: ""
    };
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
  computed: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>

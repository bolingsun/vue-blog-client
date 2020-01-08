<template>
  <v-container fluid>
    <div><v-btn text color="primary" @click="goBack">返回</v-btn></div>
    <!-- 标题 -->
    <div class="d-flex justify-center">
      <div class="title font-weight-bold">{{ article.title }}</div>
    </div>
    <div class="caption mb-2">
      <span class="mr-2">发布于{{ article.publish_time | formatDate }}</span>
      <span class="mr-2">阅读{{ article.visit_count }}</span>
      <span class="mr-2">喜欢{{ article.like_count }}</span>
    </div>
    <!-- 内容 -->
    <div class="body-1 article-content">
      <div v-html="article.content"></div>
    </div>
    <v-divider></v-divider>
    <!-- 评论 -->
    <div class="mt-2 mb-2">目前{{ article.comment_count }}条评论</div>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="item in commentList"
        :key="item.title"
        class="d-flex flex-column align-start mb-4 grey lighten-5"
      >
        <div class="subtitle-2">
          {{ item.user_id.username }}说道：
          <v-btn text small color="info" @click="openReley(item)">回复</v-btn>
        </div>
        <div class="pl-10">
          <div class="caption">
            {{ item.created | formatDate }}
          </div>
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
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">回复</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    label="添加新回复"
                    auto-grow
                    rows="2"
                    placeholder="请输入回复内容"
                    v-model="newReply"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false"
              >取消</v-btn
            >
            <v-btn color="green darken-1" text @click="handleNewReply"
              >确定</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <div v-if="token">
      <v-textarea
        outlined
        label="添加新评论"
        placeholder="请输入内容"
        v-model="newComment"
      ></v-textarea>
      <div class="d-flex justify-center">
        <v-btn block color="secondary" @click="handleAddNewComment">提交</v-btn>
      </div>
    </div>
    <div v-else class="d-flex justify-center">
      <v-btn color="secondary" @click="handleToLogin">登录后发表评论</v-btn>
    </div>
  </v-container>
</template>

<script>
import { articleDetail, commentList, addComment, addReply } from "@/api/blog";
import { mapState } from "vuex";
// import hljs from "highlight.js";
// import "highlight.js/styles/atom-one-dark.css";
// const highlightCode = () => {
//   const preEl = document.querySelectorAll("pre");

//   preEl.forEach(el => {
//     hljs.highlightBlock(el);
//   });
// };
export default {
  name: "AtricleDetail",
  components: {},
  data() {
    return {
      article: {
        title: "",
        content: "",
        visit_count: 0,
        comment_count: 0,
        like_count: 0,
        publish_time: ""
      },
      commentList: [],
      user: "",
      newComment: "",
      newReply: "",
      dialog: false,
      commentId: "" // 发布回复的父评论id
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
  computed: {
    ...mapState({
      token: state => state.user.token
    })
  },
  created() {
    this.initData();
  },
  mounted() {
    // highlightCode();
  },
  updated() {
    // highlightCode();
  },
  beforeDestroy() {},
  methods: {
    initData() {
      // console.log(this.$route);
      let para = {
        id: this.$route.query.id
      };
      articleDetail(para)
        .then(res => {
          this.article = { ...res.data };
        })
        .catch(err => {
          console.log(err);
        });
      commentList(para)
        .then(res => {
          this.commentList = [...res.data];
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleAddNewComment() {
      if (!this.newComment) {
        return;
      }
      let para = {
        articleId: this.$route.query.id,
        content: this.newComment
      };
      addComment(para)
        .then(() => {
          this.newComment = "";
          this.initData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleNewReply() {
      if (!this.newReply) {
        return;
      }
      let para = {
        id: this.commentId,
        content: this.newReply
      };
      addReply(para)
        .then(() => {
          this.dialog = false;
          this.commentId = "";
          this.newReply = "";
          this.initData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    openReley(v) {
      this.dialog = true;
      this.commentId = v._id;
    },
    goBack() {
      // this.$router.push({ path: "/home" });
      this.$router.back();
    },
    handleToLogin() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss">
.article-content {
  // 图片样式
  img {
    max-width: 100%;
  }
  // 代码块样式
  pre {
    padding: 10px;
    margin: 8px 0;
    background: #cfd8dc;
    color: #8959a8;
    white-space: pre-wrap;
    word-break: break-all;
    font-family: "Lucida Console, Consolas, Monaco";
  }
  // .ql-syntax {
  //   background-color: #23241f;
  //   color: #f8f8f2;
  // }
}
</style>

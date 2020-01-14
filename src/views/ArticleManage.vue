<template>
  <v-container fluid class="white">
    <v-data-table
      :headers="headers"
      :items="tableData"
      sort-by="publish_time"
      class="elevation-1"
    >
      <template v-slot:item.action="{ item }">
        <v-icon small @click="deleteItem(item)">
          删除
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">确认删除?</v-card-title>
        <v-card-text>删除操作不可恢复.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="handleCancel">取消</v-btn>
          <v-btn color="green darken-1" text @click="handleDelete">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {
  articleAdminList,
  uploadPicDelete,
  articleAdminDelete
} from "@/api/blog";
export default {
  name: "ArticleManage",
  components: {},
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "文章标题",
        align: "left",
        sortable: false,
        value: "title"
      },
      { text: "状态", value: "status" },
      { text: "简介", value: "brief" },
      { text: "查看数", value: "visit_count" },
      { text: "评论数", value: "comment_count" },
      { text: "操作", value: "action", sortable: false }
    ],
    tableData: [],
    articleId: "",
    deleteImgSrc: ""
  }),

  computed: {},

  watch: {},

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      let para = {
        currentPage: 1,
        pageSize: 999
      };
      articleAdminList(para)
        .then(res => {
          this.tableData = [...res.data];
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteItem(item) {
      this.dialog = true;
      this.articleId = item._id;
      if (item.cover_img) {
        let temArry = item.cover_img.split("/");
        this.deleteImgSrc = temArry[temArry.length - 1];
      }
    },
    handleDelete() {
      if (this.deleteImgSrc) {
        uploadPicDelete({ name: this.deleteImgSrc }).then(() => {
          articleAdminDelete({ id: this.articleId })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.dialog = false;
              this.articleId = "";
              this.deleteImgSrc = "";
              this.initialize();
            })
            .catch(err => {
              console.log(err);
            });
        });
      } else {
        articleAdminDelete({ id: this.articleId })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.dialog = false;
            this.articleId = "";
            this.deleteImgSrc = "";
            this.initialize();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleCancel() {
      this.$message({
        type: "info",
        message: "取消删除"
      });
      this.dialog = false;
      this.articleId = "";
      this.deleteImgSrc = "";
    }
  }
};
</script>

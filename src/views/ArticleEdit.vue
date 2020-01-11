<template>
  <v-container fluid class="white">
    <v-form ref="form">
      <v-text-field
        v-model="title"
        :error-messages="titleErrors"
        :counter="20"
        label="标题"
        required
        @input="$v.title.$touch()"
        @blur="$v.title.$touch()"
      ></v-text-field>
      <v-text-field v-model="brief" label="简介"></v-text-field>
      <v-file-input
        accept="image/jpeg, image/png"
        label="封面图片"
        prepend-icon="mdi-file-image-outline"
        @change="handleInputChange"
      ></v-file-input>
      <v-row>
        <v-col cols="12">
          <quill-editor
            ref="myQuillEditor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </v-col>
      </v-row>
      <v-btn class="mr-4" outlined @click="submit">提交</v-btn>
      <v-btn outlined @click="clear">清空</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { articleAdd, upload } from "@/api/blog";
export default {
  mixins: [validationMixin],
  validations: {
    title: { required }
  },
  name: "ArticleEdit",
  components: {},
  data() {
    return {
      title: "",
      brief: "",
      content: "",
      cover_img: "",
      editorOption: {
        // 编辑器自定义
        placeholder: "请输入内容",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ color: [] }, { background: [] }],
            ["image"]
          ]
        }
      }
    };
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Title is required.");
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      let para = {
        title: this.title,
        brief: this.brief,
        cover_img: this.cover_img,
        content: this.content
      };
      articleAdd(para)
        .then(() => {
          this.$router.push({
            name: "Home",
            params: {
              reload: true
            }
          });
          this.clear();
        })
        .catch(err => {
          console.log(err);
        });
    },
    clear() {
      this.$v.$reset();
      this.$refs.form.reset();
      this.title = "";
      this.brief = "";
      this.cover_img = "";
      this.content = "";
    },
    handleInputChange(v) {
      if (v) {
        let data = new FormData();
        data.append("fileName", v.name);
        data.append("file", v);
        upload(data)
          .then(res => {
            this.cover_img = res.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 失去焦点事件
    onEditorBlur() {},
    // 获得焦点事件
    onEditorFocus() {},
    // 内容改变事件
    onEditorChange() {}
  }
};
</script>

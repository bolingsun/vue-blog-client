<template>
  <v-container fluid class="white">
    <form>
      <v-text-field
        v-model="title"
        :error-messages="titleErrors"
        :counter="10"
        label="Title"
        required
        @input="$v.title.$touch()"
        @blur="$v.title.$touch()"
      ></v-text-field>
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
      <v-btn class="mr-4" outlined @click="submit">submit</v-btn>
      <v-btn outlined @click="clear">clear</v-btn>
    </form>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { articleAdd } from "@/api/blog";
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
      content: "", // 工单内容，编辑器内容
      editorOption: {
        // 编辑器自定义
        placeholder: "请输入内容",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
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
        content: this.content
      };
      articleAdd(para).then(res => {
        console.log(res);
      });
    },
    clear() {
      this.$v.$reset();
      this.name = "";
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

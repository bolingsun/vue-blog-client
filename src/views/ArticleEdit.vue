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
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ color: [] }, { background: [] }],
  ["image"]
];
const handlers = {
  image: function image() {
    let self = this;
    var fileInput = this.container.querySelector("input.ql-image[type=file]");
    if (fileInput === null) {
      fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      // 可设置上传图片的格式
      fileInput.setAttribute("accept", "image/png, image/gif, image/jpeg");
      fileInput.classList.add("ql-image");
      // 监听选择文件
      fileInput.addEventListener("change", function() {
        // console.log(fileInput.files[0]);
        let file = fileInput.files[0];
        if (!/image\/\w+/.test(file.type)) {
          console.log("图片格式不正确");
          return false;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          let img = new Image();
          img.src = this.result;
          img.onload = function() {
            let that = this;
            let scale = 800 / that.width;
            let w = 800;
            let h = that.height * scale;
            // let w = that.width;
            // let h = that.height;
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let anw = document.createAttribute("width");
            anw.nodeValue = w;
            let anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            let base64 = canvas.toDataURL("image/jpeg", 0.5);
            // console.log(base64);
            let length = self.quill.getSelection(true).index;
            self.quill.insertEmbed(length, "image", base64);
            self.quill.setSelection(length + 1);
          };
        };
        // 创建formData
        // var formData = new FormData();
        // formData.append(uploadConfig.name, fileInput.files[0]);
        // formData.append("object", "product");
        // 图片上传
        // var xhr = new XMLHttpRequest();
        // xhr.open(uploadConfig.methods, uploadConfig.action, true);
        // // 上传数据成功，会触发
        // xhr.onload = function(e) {
        //   if (xhr.status === 200) {
        //     var res = JSON.parse(xhr.responseText);
        //     let length = self.quill.getSelection(true).index;
        //     //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。
        //     self.quill.insertEmbed(length, "image", res.path);
        //     self.quill.setSelection(length + 1);
        //   }
        //   fileInput.value = "";
        // };
        // // 开始上传数据
        // xhr.upload.onloadstart = function(e) {
        //   fileInput.value = "";
        // };
        // // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
        // xhr.upload.onerror = function(e) {};
        // // 上传数据完成（成功或者失败）时会触发
        // xhr.upload.onloadend = function(e) {
        //   // console.log('上传结束')
        // };
        // xhr.send(formData);
      });
      this.container.appendChild(fileInput);
    }
    fileInput.click();
  }
};
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
          toolbar: {
            container: toolbarOptions,
            handlers: handlers
          }
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
    /**
     * 图片压缩，默认同比例压缩
     * @param {Object} path
     * pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
     * @param {Object} obj
     * obj 对象 有 width， height， quality(0-1)
     * @param {Object} callback
     * 回调函数有一个参数，base64的字符串数据
     */
    dealImage(path, obj, callback) {
      var img = new Image();
      img.src = path;
      img.onload = function() {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        var quality = obj.quality || 0.7; // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL("image/jpeg", quality);
        // 回调函数返回base64的值
        callback(base64);
      };
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

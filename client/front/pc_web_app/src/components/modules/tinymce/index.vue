<template>
  <editor
    v-model="content"
    :init="init"
    @onSelectionChange="commitVal"
  ></editor>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/icons/default";
import "tinymce/themes/silver";

// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
export default {
  name: "Tinymce",
  components: {
    editor: Editor
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Boolean,
      default: true
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat"
    },
    height: {
      type: [Number, String],
      default: 300
    }
  },
  data() {
    return {
      init: this.init_editor(),
      content: this.value
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    commitVal() {
      this.$emit("reviveVal", this.content);
    },
    init_editor() {
      return {
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        content_css: "/tinymce/skins/content/default/content.css",
        height: this.height,
        plugins: this.plugins,
        toolbar: this.toolbar,
        // branding: false,
        menubar: this.menu,
        // 图片上传配置
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
        file_picker_callback: function(cb) {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          /*
            Note: In modern browsers input[type="file"] is functional without
            even adding it to the DOM, but that might not be the case in some older
            or quirky browsers like IE, so you might want to add it to the DOM
            just in case, and visually hide it. And do not forget do remove it
            once you do not need it anymore.
          */
          input.onchange = function() {
            const file = this.files[0];

            const reader = new FileReader();
            reader.onload = function() {
              /*
                Note: Now we need to register the blob in TinyMCEs image blob
                registry. In the next release this part hopefully won't be
                necessary, as we are looking to handle it internally.
              */
              const id = "blobid" + new Date().getTime();
              const blobCache = tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(",")[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };
          input.click();
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

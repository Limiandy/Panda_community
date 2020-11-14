<template>
  <transition name="fade">
    <div
      ref="wrapper"
      class="layui-layer layui-layer-page layui-layer-border"
      v-show="isShow"
    >
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane panda-m-1">
          <li class="layui-form-item">
            <label class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <label>
                <input
                  type="text"
                  id="fileInput"
                  placeholder="粘贴图片地址或点击上传"
                  class="layui-input"
                  v-model="name"
                />
              </label>
            </div>
            <button type="button" class="layui-btn layui-btn-primary">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload"></i> 上传图片
              </label>
            </button>
            <input
              type="file"
              name="file"
              id="uploadImg"
              class="layui-upload-file"
              @change.stop="upload"
            />
          </li>
          <li class="layui-form-item">
            <button class="layui-btn" type="button" @click.stop="submit">
              确认
            </button>
          </li>
        </ul>
      </div>
      <span class="layui-layer-setwin"
        ><a
          class="layui-layer-ico layui-layer-close layui-layer-close1"
          href="javascript:void(0)"
          @click.stop="close()"
        ></a
      ></span>
    </div>
  </transition>
</template>

<script>
import { uploadImg } from "@/api/content";
import config from "@/config";
export default {
  name: "uploadImg",
  props: ["isShow"],
  data() {
    return {
      name: "",
      formDate: ""
    };
  },
  methods: {
    upload(e) {
      let file = e.target.files;
      let formDate = new FormData();
      if (file.length > 0) {
        formDate.append("file", file[0]);
        this.formDate = formDate;
      }

      uploadImg(this.formDate).then(res => {
        const result = res;
        if (result.code === 200) {
          const baseUrl =
            process.env.NODE_ENV === "producton"
              ? config.baseURL.prod
              : config.baseURL.dev;
          this.name = baseUrl + res.data;

          document.getElementById("uploadImg").value = "";
        }
      });
    },
    submit() {
      if (this.name === "") {
        document.getElementById("fileInput").focus();
        this.$pop("shake", "请上传图片或复制图片链接");
        return;
      }
      this.$emit("addEvent", "img", this.name);
      setTimeout(() => {
        // 恢复初始的状态
        this.name = "";
        this.formDate = "";
        this.$emit("closeEvent");
      }, 0);
    },
    close() {
      this.$emit("closeEvent");
      this.name = "";
      this.formDate = "";
    }
  },
  watch: {
    isShow(n, o) {
      if (n !== o && !n) {
        this.name = "";
        this.formDate = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.layui-layer {
  position: absolute;
  left: 3px;
  top: 35px;
}
.layui-form-item {
  text-align: center;
}
</style>

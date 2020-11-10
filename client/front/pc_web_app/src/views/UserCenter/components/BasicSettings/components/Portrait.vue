<template>
  <div>
    <form class="layui-form layui-form-pane">
      <div class="layui-form-item">
        <div class="avatar-add">
          <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
          <label for="pic" type="button" class="layui-btn upload-img">
            <i class="layui-icon">&#xe67c;</i>上传头像
            <input
              type="file"
              id="pic"
              name="file"
              accept="image/png, image/gif, image/jpg"
              @change="upload"
            />
          </label>
          <img :src="pic" />
          <span class="loading"></span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { uploadImg } from "@/api/content.js";
import { updateUserInfo } from "@/api/user";
import config from "@/config/index.js";
export default {
  name: "Portrait",
  data() {
    return {
      pic:
        typeof this.$store.state.userInfo.pic !== "undefined" &&
        this.$store.state.userInfo.pic
          ? this.$store.state.userInfo.pic
          : "/header-k.jpg",
      formDate: ""
    };
  },
  methods: {
    upload(e) {
      // 1. 获得formDate 数据
      let file = e.target.files;
      let formDate = new FormData();
      if (file.length > 0) {
        formDate.append("file", file[0]);
        this.formDate = formDate;
      }
      // 2. 上传图片
      uploadImg(this.formDate).then(res => {
        if (res.code === 200) {
          const baseUrl =
            process.env.NODE_ENV === "producton"
              ? config.baseURL.prod
              : config.baseURL.dev;
          this.pic = baseUrl + res.data;
          // 3. 更新用户资料
          updateUserInfo({ pic: this.pic }).then(res => {
            if (res.code === 200) {
              // 修改全局的用户基本信息
              let user = this.$store.state.userInfo;
              user.pic = this.pic;
              this.$store.commit("setUserInfo", user);
              this.$pop("", "头像更新成功");
            }
          });
          document.getElementById("pic").value = "";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
input[type="file"] {
  display: none;
}
</style>

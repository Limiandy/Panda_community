<template>
  <div></div>
</template>

<script>
import { updateUsername } from "@/api/user.js";
export default {
  name: "Confirm",
  data() {
    return {
      username: ""
    };
  },
  beforeMount() {
    this.$store.commit("setIsNot", true);
  },
  mounted() {
    let queryStr = window.location.href.replace(/.*\?/, "");
    let obj = Object.fromEntries(queryStr.split("&").map(v => v.split("=")));
    this.username = decodeURIComponent(obj.username);
    obj.username = this.username;
    this.$confirm(
      "确定要修改用户名吗？",
      () => {
        updateUsername(obj).then(res => {
          if (res.code === 200) {
            this.$alert("修改成功，请使用新用户名重新登录", () => {
              localStorage.clear();
              this.$store.commit("setToken", "");
              this.$store.commit("setUserInfo", "");
              this.$store.commit("setLogin", false);
              if (this.$route.path !== "/") {
                this.$router.push("/");
              } else {
                this.$router.go(0);
              }
              this.$store.commit("setIsNot", false);
            });
            return;
          }
          if (res.code === 503) {
            this.$alert(`更新失败,${res.msg}`, () => {
              this.$router.push("/");
              this.$store.commit("setIsNot", false);
            });
            return;
          }
          if (res.code === 500) {
            this.$alert("更新失败，数据库错误", () => {
              this.$router.push("/");
              this.$store.commit("setIsNot", false);
            });
          }
        });
      },
      () => {
        this.$router.push("/");
        this.$store.commit("setIsNot", false);
      }
    );
  }
};
</script>

<style lang="sass" scoped></style>

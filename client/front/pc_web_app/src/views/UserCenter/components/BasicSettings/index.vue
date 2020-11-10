<template>
  <div class="setting-wrap">
    <ul class="layui-tab-title">
      <router-link
        tag="li"
        :to="{ name: 'BasicSettings', params: { tName: 'infomation' } }"
        >我的资料</router-link
      >
      <router-link
        tag="li"
        :to="{ name: 'BasicSettings', params: { tName: 'portrait' } }"
        >头像</router-link
      >
      <router-link
        tag="li"
        :to="{ name: 'BasicSettings', params: { tName: 'passwd' } }"
        >修改密码</router-link
      >
      <router-link
        tag="li"
        :to="{ name: 'BasicSettings', params: { tName: 'account' } }"
        >帐号绑定</router-link
      >
    </ul>
    <div class="layui-tab-content">
      <component :is="popName"></component>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicSettings",
  components: {
    "bs-information": () => import("./components/MyInformation"),
    "bs-portrait": () => import("./components/Portrait"),
    "bs-passd": () => import("./components/Passd"),
    "bs-account-binding": () => import("./components/AccountBinding")
  },
  props: ["tName"],
  watch: {
    tName: function(val) {
      this.init(val);
    }
  },
  data() {
    return {
      popName: ""
    };
  },
  beforeMount() {
    if (
      !this.tName ||
      this.tName === "undefined" ||
      typeof this.tName === "undefined"
    ) {
      this.$router.push({
        name: "BasicSettings",
        params: { tName: "infomation" }
      });
    } else {
      this.init(this.tName);
    }
  },
  methods: {
    init(tName) {
      switch (tName) {
        case "infomation":
          this.popName = "bs-information";
          break;
        case "portrait":
          this.popName = "bs-portrait";
          break;
        case "passwd":
          this.popName = "bs-passd";
          break;
        case "account":
          this.popName = "bs-account-binding";
          break;
        default:
          this.$router.push({
            name: "BasicSettings",
            params: { tName: "infomation" }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.setting-wrap {
  width: 100%;
  height: 100%;
}
</style>

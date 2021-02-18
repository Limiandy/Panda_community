<template>
  <div id="app">
    <Header v-if="!isNot" />
    <router-view />
    <Footer v-if="!isNot" />
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  computed: {
    isNot() {
      return this.$store.state.isNot;
    }
  },
  watch: {
    isNot(n) {
      if (n === true) {
        document.getElementsByTagName("body")[0].style = "padding: 0;";
      } else {
        document.getElementsByTagName("body")[0].style = "padding-top: 60px;";
      }
      this.$nextTick();
    }
  }
};
</script>
<style lang="scss">
@import "./assets/layui/css/layui.css";
@import "./assets/layui/css/modules/layer/default/layer.css";
@import "./assets/css/hinc/hinc.css";
@import "./assets/css/hinc/hinc-helper.css";
@import "./assets/css/iconfont/iconfont.css";
@import "assets/css/global.css";
html {
  height: 100%;
}
body {
  padding-top: 60px;
  background-color: #f0f0f0;
  height: 100%;
}
hr {
  margin: 3px 0;
}
.danger {
  color: #ff5722 !important;
}
#app {
  height: 100%;
}
</style>

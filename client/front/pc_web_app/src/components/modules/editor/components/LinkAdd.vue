<template>
  <transition name="fade">
    <div
      class="layui-layer layui-layer-page layui-layer-prompt"
      v-show="isShow"
    >
      <div class="layui-layer-title">请输入合法链接</div>
      <div class="layui-layer-content">
        <label
          ><input
            id="inputItem"
            type="text"
            class="layui-layer-input"
            v-model="link"
        /></label>
      </div>
      <span class="layui-layer-setwin" @click.stop="cancel()">
        <a
          class="layui-layer-ico layui-layer-close layui-layer-close1"
          href="javascript:void(0)"
        ></a>
      </span>
      <div class="layui-layer-btn">
        <a
          href="javascript:void(0)"
          class="layui-layer-btn0"
          @click.prevent="submit()"
          >确定</a
        >
        <a
          href="javascript:void(0)"
          class="layui-layer-btn1"
          @click.prevent="cancel()"
          >取消</a
        >
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LinkAdd",
  props: ["isShow"],
  data() {
    return {
      link: ""
    };
  },
  methods: {
    submit() {
      if (this.link === "") {
        document.getElementById("inputItem").focus();
        this.$pop("shake", "请输入合法的链接");
        return;
      }
      this.$emit("addEvent", "link", this.link);
      setTimeout(() => {
        this.link = "";
        this.$emit("closeEvent");
      }, 0);
    },
    cancel() {
      this.$emit("closeEvent");
      this.link = "";
    }
  },
  watch: {
    isShow(n, o) {
      if (n !== o && !n) {
        this.link = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.layui-layer {
  position: absolute;
  top: 35px;
  left: 4px;
}
</style>

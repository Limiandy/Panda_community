<template>
  <transition name="fade">
    <div
      class="layui-layer layui-layer-page layui-layer-prompt"
      v-show="isShow"
    >
      <div class="layui-layer-title">请输入引用</div>
      <div class="layui-layer-content">
        <label>
          <textarea
            id="textItem"
            class="layui-textarea"
            v-model="content"
          ></textarea>
        </label>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
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
  name: "Quote",
  props: ["isShow"],
  data() {
    return {
      content: ""
    };
  },
  methods: {
    submit() {
      if (this.content === "") {
        document.getElementById("textItem").focus();
        this.$pop("shake", "请输入引用");
        return;
      }
      this.$emit("addEvent", "quote", this.content);
      setTimeout(() => {
        this.content = "";
        this.$emit("closeEvent");
      }, 0);
    },
    cancel() {
      this.$emit("closeEvent");
      this.content = "";
    }
  },
  watch: {
    isShow(n, o) {
      if (n !== o && !n) {
        this.content = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.layui-layer {
  position: absolute;
  top: 35px;
  left: 3px;
}
.layui-textarea {
  width: 300px;
}
</style>

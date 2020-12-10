<template>
  <transition name="fade">
    <div
      class="layui-layer layui-layer-page layui-layer-prompt"
      v-show="isShow"
    >
      <div class="layui-layer-title">请贴入代码或任意文本</div>
      <div class="layui-layer-content">
        <label>
          <textarea
            ref="codeText"
            id="code_text"
            class="layui-textarea"
            v-model="value"
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
  name: "CodeBox",
  props: ["isShow", "width", "height"],
  data() {
    return {
      value: ""
    };
  },
  mounted() {
    this.$refs.codeText.style.width = this.width + "px";
    this.$refs.codeText.style.height = this.height + "px";
  },
  methods: {
    submit() {
      if (this.value === "") {
        document.getElementById("code_text").focus();
        this.$pop("shake", "请输入你的代码");
        return;
      }
      this.$emit("addEvent", "code", this.value);
      setTimeout(() => {
        this.value = "";
        this.$emit("closeEvent");
      }, 0);
    },
    cancel() {
      this.$emit("closeEvent");
      this.value = "";
    }
  },
  watch: {
    isShow(n, o) {
      if (n !== o && !n) {
        this.value = "";
      }
    },
    width(n, o) {
      if (n) {
        this.$refs.codeText.style.width = n + "px";
      } else {
        this.$refs.codeText.style.width = o + "px";
      }
    },
    height(n, o) {
      if (n) {
        this.$refs.codeText.style.height = n + "px";
      } else {
        this.$refs.codeText.style.height = o + "px";
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
  z-index: 20;
}
</style>

<template>
  <div class="panda-pop-up" v-show="isShow">
    <div class="mask" @click="close()"></div>
    <div class="pop-wrap active">
      <header class="panda-panel">
        <span>{{ title }}</span>
        <button
          type="button"
          class="layui-btn layui-btn-sm layui-btn-primary"
          @click="close()"
        >
          <i class="layui-icon layui-icon-close"></i>
        </button>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "弹出层"
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.panda-pop-up {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 10000;
}
.mask {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.8);
}
.pop-wrap {
  width: 260px;
  height: 340px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -170px;
  margin-left: -130px;
  &.active {
    animation-fill-mode: both;
    animation-duration: 0.5s;
    animation-name: bounceIn;
  }
  .panda-panel {
    padding: 8px 5px;
    padding-left: 8px;
    margin-bottom: 6px;
    .layui-btn {
      background-color: transparent;
      border: none;
      float: right;
      padding: 0;
      margin: 0;
      position: relative;
      top: -3px;
    }
  }
}
</style>

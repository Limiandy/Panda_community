<template>
  <div v-show="isShow">
    <div class="alert">
      <div class="alert-wrap">
        <div class="msg">
          {{ msg }}
        </div>
        <div class="buttons">
          <button type="button" class="alert-btn" @click="_close()">
            确定
          </button>
        </div>
      </div>
    </div>
    <div class="mask" @click="maskClose()"></div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    msg: {
      type: String,
      default: "消息弹出框"
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _close() {
      this.isShow = false;
    },
    maskClose() {
      this._close();
    }
  }
};
</script>

<style lang="scss" scoped>
$btn-main: #009688;
$btn-dark: darken($btn-main, 5%);
.alert {
  width: 300px;
  height: 150px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  padding: 20px 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -75px;
  z-index: 9999;
}
.alert-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.msg {
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.buttons {
  text-align: center;
  .alert-btn {
    background-color: $btn-main;
    color: #fff;
    width: 105px;
    height: 30px;
    border: none;
    border-radius: 3px;
    &:hover {
      background-color: $btn-dark;
    }
  }
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 2000;
  overflow: hidden;
}
</style>

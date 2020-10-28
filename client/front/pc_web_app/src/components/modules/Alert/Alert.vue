<template>
  <div v-show="isShow">
    <div class="alert">
      <div class="alert-wrap">
        <div class="msg">
          {{ msg }}
        </div>
        <div class="buttons" v-if="type === 'alert'">
          <button type="button" class="success-btn" @click="_close()">
            确定
          </button>
        </div>
        <div class="buttons" v-else-if="type === 'confirm'">
          <button type="button" class="cancel-btn" @click="cancelEvent()">
            取消
          </button>
          <button type="button" class="success-btn" @click="successEvent()">
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
    type: {
      type: String,
      default: "alert"
    },
    msg: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    },
    success: {
      type: Function,
      default: () => {
        console.log("success");
      }
    },
    cancel: {
      type: Function,
      default: () => {
        console.log("cancel");
      }
    }
  },
  methods: {
    _close() {
      this.isShow = false;
    },
    maskClose() {
      if (this.type === "alert") {
        this._close();
      }
    },
    cancelEvent() {
      this.cancel();
      this._close();
    },
    successEvent() {
      this.success();
      this._close();
    }
  }
};
</script>

<style lang="scss" scoped>
$btn-success-main: #009688;
$btn-success-dark: darken($btn-success-main, 5%);
$btn-cancel-main: #ededed;
$btn-cancel-dark: darken($btn-cancel-main, 5%);
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
  width: 100%;
  padding: 0 5px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  .success-btn {
    background-color: $btn-success-main;
    color: #fff;
    width: 105px;
    height: 30px;
    border: none;
    border-radius: 3px;
    &:hover {
      background-color: $btn-success-dark;
    }
  }
  .cancel-btn {
    background-color: $btn-cancel-main;
    color: #333;
    width: 105px;
    height: 30px;
    border: none;
    border-radius: 3px;
    &:hover {
      background-color: $btn-cancel-dark;
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

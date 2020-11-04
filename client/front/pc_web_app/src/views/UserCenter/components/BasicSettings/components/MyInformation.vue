<template>
  <div>
    <form class="layui-form layui-form-pane">
      <div class="layui-form-item">
        <label for="email" class="layui-form-label">邮箱</label>
        <div class="layui-input-inline">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="请输入邮箱"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label for="nickName" class="layui-form-label">昵称</label>
        <div class="layui-input-inline">
          <input
            type="text"
            id="nickName"
            name="nickName"
            placeholder="请输入新昵称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
        <div class="layui-form-mid layui-word-aux">
          <input
            id="radio-male"
            type="radio"
            name="sex"
            value="male"
            v-model="sex"
            checked
          />
          <label for="radio-male" class="checked"></label>
          <span class="radio-name">男</span>
          <input
            id="radio-fmale"
            type="radio"
            name="sex"
            value="fmale"
            v-model="sex"
          />
          <label for="radio-fmale" class="checked"></label>
          <span class="radio-name">女</span>
        </div>
      </div>
      <div class="layui-form-item">
        <label for="location" class="layui-form-label">城市</label>
        <div class="layui-input-inline">
          <input
            type="text"
            id="location"
            name="location"
            placeholder="你来自哪里"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">个性签名</label>
        <div class="layui-input-block">
          <textarea
            name="desc"
            placeholder="请输入你最喜欢的一句话"
            class="layui-textarea"
          ></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-inline">
          <button class="layui-btn">
            立即提交
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "MyInformation",
  data() {
    return {
      sex: "male"
    };
  },
  mounted() {
    console.log(this.sex);
  },
  watch: {
    sex: function(n, o) {
      console.log(n, o);
    }
  }
};
</script>

<style lang="scss" scoped>
.checked {
  width: 12px;
  height: 12px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-top: -5px;
  margin-right: 5px;
  margin-left: 8px;
  &::before {
    content: "";
    width: 12px;
    height: 12px;
    // background-color: red;
    border: 1px solid #999;
    position: absolute;
    top: 0;
    left: 0;
  }
}
input[type="radio"]:checked + .checked {
  &::before {
    background-color: #009699;
  }
}
.layui-textarea {
  resize: none;
}
</style>

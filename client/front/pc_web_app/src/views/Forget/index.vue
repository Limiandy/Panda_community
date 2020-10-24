<template>
  <div class="forget">
    <div class="layui-container panda-form-container">
      <div class="layui-tab">
        <ul class="layui-tab-title">
          <li>
            <router-link
              :to="{ name: 'Login' }"
              active-class=""
              exact-active-class=""
              >登录</router-link
            >
          </li>
          <li class="layui-this">
            <router-link :to="{ name: 'Forget' }">找回密码</router-link>
          </li>
        </ul>
        <div class="layui-tab-content">
          <div class="layui-tab-item layui-show">
            <form class="layui-form layui-form-pane">
              <div class="layui-form-item">
                <label for="email" class="layui-form-label">邮箱</label>
                <div class="layui-input-inline">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="请输入你注册时提供的邮箱"
                    autocomplete="off"
                    class="layui-input"
                  />
                </div>
              </div>
              <div class="layui-form-item">
                <label for="captcha" class="layui-form-label">验证码</label>
                <div class="layui-input-inline">
                  <input
                    type="text"
                    id="captcha"
                    name="captcha"
                    placeholder="请输入验证码"
                    autocomplete="off"
                    class="layui-input"
                  />
                </div>
                <div class="layui-form-mid layui-word-aux">辅助文字</div>
              </div>
              <div class="layui-form-item">
                <button type="button" class="layui-btn">
                  提交
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Forget",
  components: {},
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped></style>

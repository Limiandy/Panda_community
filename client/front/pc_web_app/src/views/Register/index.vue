<template>
  <div class="register">
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
            <router-link :to="{ name: 'Register' }">注册</router-link>
          </li>
        </ul>
        <div class="layui-tab-content">
          <div class="layui-tab-item layui-show">
            <form class="layui-form layui-form-pane">
              <div class="layui-form-item">
                <label class="layui-form-label">邮箱</label>
                <div class="layui-input-inline">
                  <input
                    type="text"
                    name="title"
                    placeholder="请输入标题"
                    autocomplete="off"
                    class="layui-input"
                  />
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">昵称</label>
                <div class="layui-input-inline">
                  <input
                    type="text"
                    name="title"
                    placeholder="请输入标题"
                    autocomplete="off"
                    class="layui-input"
                  />
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">密码</label>
                <div class="layui-input-inline">
                  <input
                    type="password"
                    name="password"
                    placeholder="请输入密码"
                    autocomplete="off"
                    class="layui-input"
                  />
                </div>
                <div class="layui-form-mid layui-word-aux">辅助文字</div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">确认密码</label>
                <div class="layui-input-inline">
                  <input
                    type="password"
                    name="password"
                    placeholder="请输入密码"
                    autocomplete="off"
                    class="layui-input"
                  />
                </div>
                <div class="layui-form-mid layui-word-aux">辅助文字</div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">验证码</label>
                <div class="layui-input-inline">
                  <input
                    type="text"
                    name="title"
                    placeholder="请输入标题"
                    autocomplete="off"
                    class="layui-input"
                  />
                </div>
              </div>
              <div class="layui-form-item">
                <button type="button" class="layui-btn">
                  立即注册
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="soci">
        <span>或者使用社交帐号登录</span>
        <span class="qq_btn"><i class="iconfont icon-qq"></i></span>
        <span class="weibo_btn"><i class="iconfont icon-weibo"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  components: {},
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped></style>

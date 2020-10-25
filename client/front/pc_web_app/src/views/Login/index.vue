<template>
  <div class="login">
    <div class="layui-container panda-form-container">
      <div class="layui-tab">
        <ul class="layui-tab-title">
          <li class="layui-this">
            <router-link
              :to="{ name: 'Login' }"
              active-class=""
              exact-active-class=""
              >登录</router-link
            >
          </li>
          <li><router-link :to="{ name: 'Register' }">注册</router-link></li>
        </ul>
        <div class="layui-tab-content">
          <div class="layui-tab-item layui-show">
            <form class="layui-form layui-form-pane">
              <validation-provider
                name="用户名"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="layui-form-item">
                  <label for="username" class="layui-form-label">用户名</label>
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      v-model="userInfo.username"
                      placeholder="请输入用户名或邮箱"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid layui-word-aux danger">
                    {{ errors[0] }}
                  </div>
                </div>
              </validation-provider>

              <validation-provider
                name="密码"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="layui-form-item">
                  <label for="password" class="layui-form-label">密码框</label>
                  <div class="layui-input-inline">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      v-model="userInfo.password"
                      placeholder="请输入密码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid layui-word-aux danger">
                    {{ errors[0] }}
                  </div>
                </div>
              </validation-provider>

              <validation-provider
                name="验证码"
                :rules="{ required: true, is: captcha.text }"
                v-slot="{ errors }"
              >
                <div class="layui-form-item">
                  <label for="captcha" class="layui-form-label">验证码</label>
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      id="captcha"
                      name="captcha"
                      v-model="captcha.code"
                      placeholder="请输入验证码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div
                    class="layui-form-mid layui-word-aux captcha"
                    v-html="captcha.svg"
                    @click="_getCaptcha"
                  ></div>
                  <div class="layui-form-mid layui-word-aux danger">
                    {{ errors[0] }}
                  </div>
                </div>
              </validation-provider>

              <div class="layui-form-item">
                <button type="button" class="layui-btn">
                  立即登录
                </button>
                <router-link
                  :to="{ name: 'Forget' }"
                  class="panda-forget-link"
                  href="http://www.layui.com"
                  >忘记密码？</router-link
                >
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
import { validate, getCaptcha } from "@/mixins/index";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Login",
  components: {},
  mixins: [validate, getCaptcha],
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      }
    };
  },
  beforeMount() {
    this.setSid();
  },
  methods: {
    setSid() {
      let sid = "";
      if (localStorage.getItem("sid")) {
        sid = localStorage.getItem("sid");
      } else {
        sid = uuidv4();
        localStorage.setItem("sid", sid);
      }
      this.$store.commit("setSid", sid);
      console.log(sid);
    }
  }
};
</script>
<style lang="scss" scoped>
.panda-forget-link {
  margin-left: 10px;
  &:hover {
    color: #9bb9a2;
  }
}
</style>

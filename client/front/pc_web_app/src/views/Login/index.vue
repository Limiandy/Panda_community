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
            <validation-observer
              ref="loginFrom"
              v-slot="{ invalid, handleSubmit }"
            >
              <form
                @submit.prevent="handleSubmit(_login)"
                class="layui-form layui-form-pane"
              >
                <validation-provider
                  name="email"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="layui-form-item">
                    <label for="username" class="layui-form-label">邮箱</label>
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        v-model="userInfo.email"
                        placeholder="请输入邮箱"
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
                  name="password"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="layui-form-item">
                    <label for="password" class="layui-form-label"
                      >密码框</label
                    >
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
                  ref="captcha"
                  name="captcha"
                  :rules="{ required: true, captcha: true }"
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

                <button
                  type="submit"
                  class="layui-btn"
                  :class="[
                    invalid === false ? 'layui-btn' : 'layui-btn-disabled'
                  ]"
                  :disabled="invalid"
                >
                  立即登录
                </button>
                <router-link
                  :to="{ name: 'Forget' }"
                  class="panda-forget-link"
                  href="http://www.layui.com"
                  >忘记密码？</router-link
                >
              </form>
            </validation-observer>
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
import { login } from "@/api/login";
export default {
  name: "Login",
  components: {},
  mixins: [validate, getCaptcha],
  data() {
    return {
      userInfo: {
        email: "",
        password: ""
      }
    };
  },
  beforeMount() {
    this.setSid();
  },
  mounted() {
    window.vue = this;
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
    },
    _login() {
      login({
        email: this.userInfo.email,
        password: this.userInfo.password,
        sid: this.$store.state.sid,
        code: this.captcha.code
      })
        .then(res => {
          if (res.code === 200) {
            this.$store.commit("setUserInfo", res.data);
            this.$store.commit("setLogin", true);
            this.$alert("登录成功，点击跳转到先前页面", () => {
              this.$router.push({ name: "Index" });
            });
            this.userInfo.password = "";
            this.userInfo.email = "";
            this.captcha.code = "";
            requestAnimationFrame(() => {
              this.$refs.loginFrom.reset();
            });
          }
          if (res.code === 404) {
            this.$alert(res.msg);
            this._getCaptcha();
          }
          if (res.code === 401) {
            this.$refs.captcha.setErrors([res.msg]);
            this._getCaptcha();
          }
        })
        .catch(err => {
          const data = err.response.data;
          if (data.code === 500) {
            this.$alert("用户名或密码输入错误，请检查");
            this._getCaptcha();
          }
        });
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

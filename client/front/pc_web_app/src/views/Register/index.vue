<template>
  <div class="register">
    <div class="layui-container panda-form-container">
      <div class="layui-tab">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'Login' }">登录</router-link>
          </li>
          <li class="layui-this">
            <router-link :to="{ name: 'Register' }">注册</router-link>
          </li>
        </ul>
        <div class="layui-tab-content">
          <validation-observer ref="regForm" v-slot="{ handleSubmit }">
            <div class="layui-tab-item layui-show">
              <form
                @submit.prevent="handleSubmit(_register)"
                class="layui-form layui-form-pane"
              >
                <validation-provider
                  name="email"
                  rules="required|email"
                  v-slot="{ errors }"
                >
                  <div class="layui-form-item">
                    <label for="email" class="layui-form-label">邮箱</label>
                    <div class="layui-input-inline">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        v-model="userInfo.email"
                        placeholder="请输入你的邮箱"
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
                  name="nickName"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="layui-form-item">
                    <label for="nickName" class="layui-form-label">昵称</label>
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        id="nickName"
                        v-model="userInfo.nickName"
                        name="title"
                        placeholder="请输入标题"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="layui-form-mid layui-word-aux danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </validation-provider>

                <validation-observer>
                  <validation-provider
                    name="password"
                    :rules="{ required: true, minmax: { min: 8, max: 16 } }"
                    :vid="userInfo.password"
                    v-slot="{ errors }"
                  >
                    <div class="layui-form-item">
                      <label for="password" class="layui-form-label"
                        >密码</label
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
                    name="repeat"
                    v-slot="{ errors }"
                    :rules="{ required: true, confirmed: userInfo.password }"
                  >
                    <div class="layui-form-item">
                      <label for="repeat" class="layui-form-label"
                        >确认密码</label
                      >
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          id="repeat"
                          name="password"
                          v-model="userInfo.repeat"
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
                </validation-observer>

                <captcha
                  :input="code"
                  :updateVal="updateVal"
                  :reRequest="reRequest"
                />

                <div class="layui-form-item">
                  <button type="submit" class="layui-btn">
                    立即注册
                  </button>
                </div>
              </form>
            </div>
          </validation-observer>
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
import { validate } from "@/mixins/index";
import Captcha from "@/components/Captcha/index";
import { register } from "@/api/login";

export default {
  name: "Register",
  components: { Captcha },
  mixins: [validate],
  data() {
    return {
      userInfo: {
        email: "",
        nickName: "",
        password: "",
        repeat: ""
      },
      code: "",
      reRequest: false
    };
  },
  methods: {
    updateVal(val) {
      this.code = val;
    },
    _register() {
      register({
        email: this.userInfo.email,
        nickName: this.userInfo.nickName,
        password: this.userInfo.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          this.userInfo.email = "";
          this.userInfo.nickName = "";
          this.userInfo.password = "";
          this.userInfo.repeat = "";
          this.code = "";
          this.reRequest = true;
          requestAnimationFrame(() => {
            this.$refs.regForm.reset();
          });
          this.$alert("注册成功，点击确定跳转到登录页面", () => {
            this.$router.push("/login");
          });
        }
        if (res.code === 500) {
          // 注册失败
          this.$refs.regForm.setErrors(res.msg);
          this.code = "";
          this.reRequest = true;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>

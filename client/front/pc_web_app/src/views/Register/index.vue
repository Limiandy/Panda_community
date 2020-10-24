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
              <validation-provider
                name="邮箱"
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
                name="昵称"
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
                  name="密码"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="layui-form-item">
                    <label for="password" class="layui-form-label">密码</label>
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
                  name="与密码一致的密码"
                  rules="required"
                  v-slot="{ errors }"
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
                      name="title"
                      v-model="captcha.code"
                      placeholder="请输入标题"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid layui-word-aux danger">
                    {{ errors[0] }}
                  </div>
                  <div
                    class="layui-form-mid layui-word-aux"
                    v-html="captcha.svg"
                    @click="_getCaptcha"
                  ></div>
                </div>
              </validation-provider>

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
import { validate, getCaptcha } from "@/mixins/index";
export default {
  name: "Register",
  components: {},
  mixins: [validate, getCaptcha],
  data() {
    return {
      userInfo: {
        email: "",
        nickName: "",
        password: "",
        repeat: ""
      }
    };
  }
};
</script>
<style lang="scss" scoped></style>

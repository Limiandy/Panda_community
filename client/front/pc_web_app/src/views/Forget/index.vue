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
              <validation-provider
                name="邮箱"
                rules="required|email"
                v-slot="{ errors }"
              >
                <div class="layui-form-item">
                  <label for="email" class="layui-form-label">邮箱</label>
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      v-model="getInfo.email"
                      placeholder="请输入你注册时提供的邮箱"
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
import { validate, getCaptcha } from "@/mixins/index";
export default {
  name: "Forget",
  components: {},
  mixins: [validate, getCaptcha],
  data() {
    return {
      getInfo: {
        email: ""
      }
    };
  }
};
</script>
<style lang="scss" scoped></style>

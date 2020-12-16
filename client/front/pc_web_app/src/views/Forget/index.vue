<template>
  <div class="forget">
    <div class="layui-container">
      <div class="layui-tab layui-tab-brief">
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
            <validation-observer ref="forgetForm" v-slot="{ handleSubmit }">
              <form
                class="layui-form layui-form-pane"
                @submit.prevent="handleSubmit(_forget)"
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

                <captcha
                  :input="code"
                  :updateVal="updateVal"
                  :reRequest="reRequest"
                />

                <div class="layui-form-item">
                  <button type="submit" class="layui-btn">
                    提交
                  </button>
                </div>
              </form>
            </validation-observer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validate } from "@/mixins/index";
import { forget } from "@/api/login";
import Captcha from "@/components/Captcha/index";
export default {
  name: "Forget",
  components: { Captcha },
  mixins: [validate],
  data() {
    return {
      getInfo: {
        email: ""
      },
      code: "",
      reRequest: false
    };
  },
  methods: {
    _forget() {
      forget({
        username: this.getInfo.email,
        captcha: this.code,
        sid: this.$store.state.sid
      })
        .then(res => {
          if (res.status === 200) {
            this.$alert(res.msg);
            this.getInfo.email = "";
            this.code = "";
            requestAnimationFrame(() => {
              this.$refs.forgetForm.reset();
            });
            this.reRequest = true;
          }
          if (res.status === 401) {
            this.$refs.forgetForm.setErrors(res.msg);
          }
          if (res.status === 500) {
            this.$alert("邮件发送失败");
            console.error(res.msg);
          }
        })
        .catch(err => {
          console.log("error123:" + err);
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>

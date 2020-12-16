<template>
  <div class="reset">
    <div class="layui-container layui-tab-brief">
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
            <router-link :to="{ name: 'Reset' }">重置密码</router-link>
          </li>
        </ul>
        <div class="layui-tab-content">
          <div class="layui-tab-item layui-show">
            <validation-observer
              ref="resetFrom"
              v-slot="{ invalid, handleSubmit }"
            >
              <form
                @submit.prevent="handleSubmit(reset)"
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
                        v-model="userInfo.username"
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

                <validation-observer>
                  <validation-provider
                    name="password"
                    :rules="{ required: true, minmax: { min: 8, max: 16 } }"
                    :vid="userInfo.password"
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
                    name="repeat"
                    v-slot="{ errors }"
                    :rules="{ required: true, confirmed: userInfo.password }"
                  >
                    <div class="layui-form-item">
                      <label for="repeat" class="layui-form-label"
                        >重复密码</label
                      >
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          id="repeat"
                          name="password"
                          v-model="userInfo.repeat"
                          placeholder="请重复输入密码"
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

                <button
                  type="submit"
                  class="layui-btn"
                  :class="[
                    invalid === false ? 'layui-btn' : 'layui-btn-disabled'
                  ]"
                  :disabled="invalid"
                >
                  立即重置
                </button>
              </form>
            </validation-observer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validate } from "@/mixins/index.js";
import { updatePassword } from "@/api/user.js";
export default {
  name: "Reset",
  mixins: [validate],
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
        repeat: ""
      }
    };
  },
  mounted() {},
  methods: {
    reset() {
      console.log(123456);
      let queryStr = window.location.href.replace(/.*\?/, "");
      let obj = {};
      obj.key = queryStr.split("=")[1];
      console.log("TCL: mounted -> obj", obj.key);
      updatePassword({
        key: obj.key,
        username: this.userInfo.username,
        password: this.userInfo.password
      }).then(res => {
        if (res.code === 200) {
          this.userInfo.username = "";
          this.userInfo.password = "";
          this.userInfo.repeat = "";
          requestAnimationFrame(() => {
            this.$refs.resetFrom.reset();
          });
          this.$alert(res.msg, () => {
            this.$router.push("/login");
          });
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped></style>

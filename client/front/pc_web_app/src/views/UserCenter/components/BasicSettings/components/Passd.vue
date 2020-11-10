<template>
  <validation-observer ref="changePwd" v-slot="{ handleSubmit }">
    <form
      class="layui-form layui-form-pane"
      @submit.prevent="handleSubmit(change)"
    >
      <validation-provider
        name="oldPassword"
        rules="required"
        v-slot="{ errors }"
      >
        <div class="layui-form-item">
          <label for="oldpassword" class="layui-form-label">当前密码</label>
          <div class="layui-input-inline">
            <input
              type="password"
              id="oldpassword"
              name="oldpassword"
              v-model="oldPassword"
              placeholder="请输入旧密码"
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
        name="newPassword"
        :rules="{ required: true, minmax: { min: 8, max: 16 } }"
        :vid="newPassword"
        v-slot="{ errors }"
      >
        <div class="layui-form-item">
          <label for="new-password" class="layui-form-label">新密码</label>
          <div class="layui-input-inline">
            <input
              type="password"
              id="new-password"
              name="new-password"
              v-model="newPassword"
              placeholder="请输入新的密码"
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
        :rules="{ required: true, confirmed: newPassword }"
        v-slot="{ errors }"
      >
        <div class="layui-form-item">
          <label for="repta" class="layui-form-label">确认密码</label>
          <div class="layui-input-inline">
            <input
              type="password"
              id="repta"
              name="repta"
              v-model="rePasswrod"
              placeholder="请重复输入新密码"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="layui-form-mid layui-word-aux danger">
            {{ errors[0] }}
          </div>
        </div>
      </validation-provider>

      <div class="layui-form-item">
        <div class="layui-input-inline">
          <button type="submit" class="layui-btn">
            确认修改
          </button>
        </div>
      </div>
    </form>
  </validation-observer>
</template>

<script>
import { validate } from "@/mixins/index.js";
import { changePassword } from "@/api/user.js";
export default {
  name: "Passd",
  mixins: [validate],
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      rePasswrod: ""
    };
  },
  methods: {
    change() {
      if (this.oldPassword === this.newPassword) {
        this.$alert("新密码不能与旧密码相同");
        return;
      }
      changePassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }).then(res => {
        if (res.code === 200) {
          this.oldPassword = "";
          this.newPassword = "";
          this.rePasswrod = "";
          requestAnimationFrame(() => {
            this.$refs.changePwd.reset();
          });

          localStorage.clear();
          this.$store.commit("setLogin", false);
          this.$store.commit("setUserInfo", {});
          this.$alert("密码修改成功，请使用新密码重新登录", () => {
            this.$router.push("/login");
          });
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped></style>

<template>
  <div>
    <validation-observer ref="userinfoForm" v-slot="{ handleSubmit }">
      <form
        class="layui-form layui-form-pane"
        @submit.prevent="handleSubmit(submit)"
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
                v-model="userinfo.username"
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

        <div class="layui-form-item">
          <label for="nickName" class="layui-form-label">昵称</label>
          <div class="layui-input-inline">
            <input
              type="text"
              id="nickName"
              name="nickName"
              v-model="userinfo.nickName"
              placeholder="请输入新昵称"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="layui-form-mid layui-word-aux"></div>
        </div>
        <div class="layui-form-item">
          <label for="location" class="layui-form-label">城市</label>
          <div class="layui-input-inline">
            <input
              type="text"
              id="location"
              name="location"
              v-model="userinfo.location"
              placeholder="你来自哪里"
              autocomplete="off"
              class="layui-input"
            />
          </div>
        </div>

        <div class="layui-form-item" style="line-height: 38px">
          <label class="layui-form-label">性别</label>
          <div class="layui-input-inline sex">
            <label for="radio-male" class="checked">
              <input
                id="radio-male"
                type="radio"
                name="sex"
                value="male"
                v-model="userinfo.sex"
                checked
              />
              <i
                class="layui-icon layui-icon-circle"
                :class="{ 'layui-icon-radio': userinfo.sex === 'male' }"
              ></i>
              <span class="radio-name">男</span>
            </label>

            <label for="radio-fmale" class="checked">
              <input
                id="radio-fmale"
                type="radio"
                name="sex"
                value="fmale"
                v-model="userinfo.sex"
              />
              <i
                class="layui-icon layui-icon-circle"
                :class="{ 'layui-icon-radio': userinfo.sex === 'fmale' }"
              ></i>
              <span class="radio-name">女</span>
            </label>
          </div>
        </div>

        <div class="layui-form-item layui-form-text">
          <label class="layui-form-label">个性签名</label>
          <div class="layui-input-block">
            <textarea
              name="desc"
              placeholder="请输入你最喜欢的一句话"
              class="layui-textarea"
              v-model="userinfo.regmark"
            ></textarea>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-input-inline">
            <button type="submit" class="layui-btn">
              立即提交
            </button>
          </div>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { validate } from "@/mixins/index.js";
import { updateUserInfo } from "@/api/user";

export default {
  name: "MyInformation",
  mixins: [validate],
  data() {
    return {
      userinfo: {
        username: "",
        nickName: "",
        location: "",
        sex: "",
        regmark: ""
      }
    };
  },
  mounted() {
    this.setUsers();
  },
  methods: {
    submit() {
      updateUserInfo({
        username: this.userinfo.username,
        nickName: this.userinfo.nickName,
        location: this.userinfo.location,
        gender: this.userinfo.sex,
        regmark: this.userinfo.regmark
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit("setUserInfo", {
            ...this.$store.state.userInfo,
            ...{
              username: this.userinfo.username,
              nickName: this.userinfo.nickName,
              location: this.userinfo.location,
              gender: this.userinfo.sex,
              regmark: this.userinfo.regmark
            }
          });
          this.$alert(res.msg);
        }
      });
      console.log(1);
    },
    setUsers() {
      const users = this.$store.state.userInfo;
      this.userinfo.username = users.username;
      this.userinfo.nickName = users.nickName;
      this.userinfo.location = users.location;
      this.userinfo.sex = users.gender;
      this.userinfo.regmark = users.regmark;
    }
  }
};
</script>

<style lang="scss" scoped>
.sex {
  margin-left: 20px;
}
.checked {
  margin-right: 12px;
  .radio-name {
    margin-left: 5px;
    position: relative;
    top: -1px;
  }
  .layui-icon-radio {
    color: #5f9091;
  }
}

.layui-textarea {
  resize: none;
}
</style>

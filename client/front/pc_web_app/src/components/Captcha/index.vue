<template>
  <div>
    <validation-provider
      ref="captcha"
      name="captcha"
      :rules="{ required: true, captcha: true }"
      v-slot="{ errors, valid }"
    >
      <div class="layui-form-item">
        <label for="captcha" class="layui-form-label">验证码</label>
        <div class="layui-input-inline">
          <input
            type="text"
            id="captcha"
            name="captcha"
            placeholder="请输入验证码"
            autocomplete="off"
            class="layui-input"
            v-model="code"
            @keyup="transmit(valid)"
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
    <slot></slot>
  </div>
</template>

<script>
/**
 * 需求：
 * 1. 页面加载完成，完成接口的请求，验证码的展示
 * 2. 校验验证码的正确性
 * 3. 向外传递验证码的值
 * 4. 接收重新请求验证的请求，然后重新请求验证码
 * 5. 可以插入按钮
 * 6. 向外传递是否验证通过
 */
import { validate } from "@/mixins/index";
import { v4 as uuidv4 } from "uuid";

import { getCaptcha } from "@/api/login";
export default {
  name: "Captcha",
  mixins: [validate],
  data() {
    return {
      code: "",
      captcha: {
        svg: "",
        text: ""
      }
    };
  },
  computed: {
    sid: function() {
      return this.$store.state.sid;
    }
  },
  watch: {
    input: function(n) {
      this.code = n;
    }
  },
  beforeMount() {
    this.setSid();
  },
  mounted() {
    this._getCaptcha();
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
    _getCaptcha() {
      getCaptcha(this.sid).then(res => {
        if (res.status === 200) {
          let captcha = {};
          captcha.svg = res.svg;
          captcha.text = res.text;
          this.captcha = captcha;
        }
      });
    },
    transmit(valid) {
      this.$emit("receiveCode", this.code, valid);
    },
    reRequest() {
      this.code = "";
      this.$refs.captcha.reset();
      this._getCaptcha();
    }
  }
};
</script>

<style lang="sass" scoped></style>

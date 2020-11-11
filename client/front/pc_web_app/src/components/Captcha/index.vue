<template>
  <div>
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
            placeholder="请输入验证码"
            autocomplete="off"
            class="layui-input"
            v-model="code"
            @input.stop="updateVal($event.target.value)"
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
    <slot :code="code"></slot>
  </div>
</template>

<script>
import { validate } from "@/mixins/index";
import { v4 as uuidv4 } from "uuid";

import { getCaptcha } from "@/api/login";
export default {
  name: "Captcha",
  mixins: [validate],
  props: {
    input: {
      type: String,
      default: ""
    },
    updateVal: Function,
    reRequest: {
      type: Boolean,
      default: false
    }
  },
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
    },
    reRequest: function(n) {
      if (n) {
        this._getCaptcha();
      }
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
    }
  }
};
</script>

<style lang="sass" scoped></style>

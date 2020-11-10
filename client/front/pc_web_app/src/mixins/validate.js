/**
 * 针对表单的前端相关验证，如非空，用户输入的相关格式是否正确等
 * 使用 vee-validate 库
 * vee-validate 相关文档 https://www.npmjs.com/package/vee-validate
 */

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import { required, email, confirmed } from "vee-validate/dist/rules";
import zh from "vee-validate/dist/locale/zh_CN.json";
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  beforeMount: function() {
    extend("required", {
      ...required
    });
    extend("email", {
      ...email
    });
    extend("captcha", {
      validate: value => {
        return value.toLowerCase() === this.captcha.text.toLowerCase();
      }
    });
    extend("confirmed", {
      ...confirmed
    });
    extend("minmax", {
      validate(value, { min, max }) {
        return value.length >= min && value.length <= max;
      },
      params: ["min", "max"]
    });
  },
  mounted() {
    localize("zh", {
      messages: {
        // rules 消息
        ...zh.messages,
        email: "请输入正确的{_field_}格式",
        required: "请输入{_field_}",
        minmax: "{_field_}最少{min}个字符，最多{max}个字符"
      },
      names: {
        email: "邮箱",
        username: "用户名",
        password: "密码",
        captcha: "验证码",
        nickName: "昵称",
        repeat: "确认密码",
        oldPassword: "原密码",
        newPassword: "新密码"
      },
      // 自定义字段消息，外层为字段名，内层为规则名
      fields: {
        captcha: {
          captcha: "{_field_}输入不正确"
        },
        repeat: {
          required: "请重复输入密码",
          confirmed: "两次输入不一致"
        }
      }
    });
  }
};

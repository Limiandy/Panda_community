/**
 * 针对表单的前端相关验证，如非空，用户输入的相关格式是否正确等
 * 使用 vee-validate 库
 * vee-validate 相关文档 https://www.npmjs.com/package/vee-validate
 */

import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, is, email } from "vee-validate/dist/rules";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  beforeMount() {
    extend("required", {
      ...required,
      message: "请填写{_field_}"
    });
    extend("is", {
      ...is,
      message: "{_field_}输入不正确"
    });
    extend("email", {
      ...email,
      message: "请输入正确的{_field_}格式"
    });
    extend("captcha", {
      validate: value => {
        return value.toLowerCase() === this.captcha.text.toLowerCase();
      },
      message: "{_field_}不正确"
    });
  }
};

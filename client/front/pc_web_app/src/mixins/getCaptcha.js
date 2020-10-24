import { getCaptcha } from "@/api/login";
export default {
  data() {
    return {
      captcha: {
        code: "",
        text: "",
        svg: ""
      }
    };
  },
  mounted() {
    this._getCaptcha();
  },
  methods: {
    _getCaptcha() {
      getCaptcha().then(res => {
        if (res.status === 200) {
          this.captcha.svg = res.svg;
          this.captcha.text = res.text;
        }
      });
    }
  }
};

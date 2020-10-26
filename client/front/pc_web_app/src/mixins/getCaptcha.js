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
  computed: {
    sid: function() {
      return this.$store.state.sid;
    }
  },
  mounted() {
    this._getCaptcha();
  },
  methods: {
    _getCaptcha() {
      getCaptcha(this.sid).then(res => {
        if (res.status === 200) {
          this.captcha.svg = res.svg;
          this.captcha.text = res.text;
        }
      });
    }
  }
};

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sid: "",
    isLogin: false,
    token: "",
    userInfo: {},
    isNot: false
  },
  mutations: {
    setSid(state, value) {
      state.sid = value;
    },
    setToken(state, value) {
      state.token = value;
      localStorage.setItem("token", value);
    },
    setLogin(state, value) {
      state.isLogin = value;
    },
    setUserInfo(state, value) {
      if (value === "") return;
      state.userInfo = value;
      // 本地存储用户基本信息
      localStorage.setItem("userInfo", JSON.stringify(value));
    },
    setIsNot(state, value) {
      state.isNot = value;
    }
  },
  actions: {},
  modules: {}
});

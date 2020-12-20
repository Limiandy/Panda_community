import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Alert from "@/components/modules/Alert/index";
import Pop from "@/components/modules/pop/index";
import * as filters from "@/filters";
import directives from "@/directives";

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

Vue.use(Alert);
Vue.use(Pop);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

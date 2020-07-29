
import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from "bootstrap-vue";
import VueWorker from "vue-worker";
import router from './router';
import store from './store'

import VueWordCloud from "vuewordcloud";
import VueClipboard from "vue-clipboard2";

// TODO: Review how best to include these files
import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "vue-good-table/dist/vue-good-table.css";
import "./assets/styles/main.css";
import "./assets/styles/main.scss";
import "./assets/styles/navbar.css";
import './registerServiceWorker'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueWorker);
Vue.use(VueClipboard);
Vue.component(VueWordCloud.name, VueWordCloud);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

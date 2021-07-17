import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VTooltip from 'v-tooltip';
import VueRouter from 'vue-router';

import './styles/global.scss'

Vue.config.productionTip = false;
Vue.use(VTooltip);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

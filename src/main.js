import Vue from 'vue';
import VueAnalytics from 'vue-analytics';

import App from './App.vue';
import './registerServiceWorker';
import { gaId } from './config.json';

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: gaId,
});

new Vue({
  render: h => h(App),
}).$mount('#app');

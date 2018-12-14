import Vue from 'vue';
import VueAnalytics from 'vue-analytics';

import App from './App.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: 'UA-131056476-1',
});

new Vue({
  render: h => h(App),
}).$mount('#app');

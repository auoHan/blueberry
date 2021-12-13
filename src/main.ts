import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import FooterNav from '@/components/FooterNav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import 'animate.css';
import {tagListModel} from '@/models/tagListModel';

export const eventBus = new Vue()

Vue.config.productionTip = false
Vue.component('FooterNav',FooterNav)
Vue.component('Layout',Layout)
Vue.component('Icon',Icon)
window.fetchExpenseList = tagListModel.fetch()
window.updateExpenseList = tagListModel.update();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

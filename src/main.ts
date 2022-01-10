import Vue from 'vue'
import App from './App.vue'
import 'animate.css';
import './registerServiceWorker'
import router from './router'
import store from './store'
import FooterNav from '@/components/FooterNav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

export const eventBus = new Vue()
Vue.config.productionTip = false
Vue.component('FooterNav',FooterNav)
Vue.component('Layout',Layout)
Vue.component('Icon',Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (document.documentElement.clientWidth>500){
  window.alert('请使用手机打开本页面，以保证浏览效果')
}

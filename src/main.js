import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/index.scss'
import axios from './api/request.js'
import 'lib-flexible'
import 'vant/lib/index.css'
import store from './store'
import VueBus from 'vue-bus'
Vue.use(VueBus)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

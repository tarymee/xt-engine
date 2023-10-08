import Vue from 'vue'
import App from './App.vue'
import { xtEngine } from '@smart100/web-engine'
import store from './store'
import VueRouter from 'vue-router'
import router from './router'
import Resource from 'vue-resource'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import './assets/css/style.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Resource)
Vue.use(ElementUI)

// console.warn(xtEngine)
xtEngine.provideFlycode('xxx', 'ssss')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

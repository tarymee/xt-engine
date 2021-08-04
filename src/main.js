import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Resource from 'vue-resource'
import ElementUI from 'element-ui'

Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import './assets/css/style.css'

Vue.use(Resource)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

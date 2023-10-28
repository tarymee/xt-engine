import Vue from 'vue'
import App from './App.vue'
import xtEngine from '@smart100/web-engine'
import store from './store'
import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueRouter)

// console.log(xtEngine)
Vue.use(xtEngine, {
  flycode: {
    'xxx': 'sss'
  },
  component: {}
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

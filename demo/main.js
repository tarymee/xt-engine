import Vue from 'vue'
import App from './App.vue'
import xtEngine from '../src/index.js'
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
  render: h => h(App)
}).$mount('#app')

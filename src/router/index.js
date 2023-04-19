import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@smart100/web-engine/src/demo/index.vue')
  },
  {
    path: '/ide',
    component: () => import('@smart100/web-ide')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

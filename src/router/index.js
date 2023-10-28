import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@smart100/web-engine/demo')
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

import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../view')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

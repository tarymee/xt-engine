import VueRouter from 'vue-router'
import engineDemoRoutes from '@smart100/web-engine/src/demo/router'

const routes = [
  {
    path: '/ide',
    component: () => import('@smart100/web-ide')
  },
  ...engineDemoRoutes
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

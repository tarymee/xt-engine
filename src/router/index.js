import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/',
    // component: () => import('@/views/login')
    component: () => import('@/views/test')
  },
  {
    path: '/ide',
    component: () => import('@xwchina/smart100-web-ide')
  },
  {
    path: '/test',
    component: () => import('@/views/test')
  },
  {
    path: '/management',
    component: () => import('@/views/management'),
    children: [
      {
        path: 'enterprise',
        component: () => import('@/views/enterprise')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

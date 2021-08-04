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
    component: () => import('@/views/login')
  },
  {
    path: '/ide',
    component: () => import('@/engine/ide')
  },
  {
    path: '/management',
    component: () => import('@/views/management'),
    children: [
      {
        path: 'enterprise',
        component: () => import('@/views/enterprise')
      },
      {
        path: 'productdev',
        component: () => import('@/views/productdev')
      },
      {
        path: 'editmap',
        component: () => import('@/views/editmap')
      },
      {
        path: 'regionmap',
        component: () => import('@/views/regionmap')
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

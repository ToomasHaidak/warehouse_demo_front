import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Business from '../views/BusinessView.vue'
import Admin from '../views/AdminView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/main',
    name: 'MainView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/MainView.vue')
    }
  },
  {
    path: '/business',
    name: 'BusinessView',
    component: Business
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: Admin
  }
]

const router = new VueRouter({
  routes
})

export default router

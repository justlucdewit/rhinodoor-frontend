import Vue from 'vue'
import VueRouter from 'vue-router'

import Order from '../views/Order.vue'
import Home from '../views/Home.vue'
import About from '../views/About'
import Contact from '../views/Contact'
import Tips from '../views/tips'
import Admin from '../views/Admin'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },

  {
    path: '/order',
    name: 'Order',
    component: Order
  },

  {
    path: '/about',
    name: 'About',
    component: About
  },

  {
    path: '/Contact',
    name: 'Contact',
    component: Contact
  },

  {
    path: '/Tips',
    name: 'Tips',
    component: Tips
  },

  {
    path: '/Admin',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '',
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../page/home.vue')
const Detail = () => import('../page/detail.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router

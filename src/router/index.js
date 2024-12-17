import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CreateHotels from '@/views/CreateHotels.vue'
import TypeRoom from '@/views/TypeRoom.vue'
import Acommodation from '@/views/Acommodation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateHotels
  },
  {
    path: '/type',
    name: 'type',
    component: TypeRoom
  },
  {
    path: '/acommodation',
    name: 'acommodation',
    component: Acommodation
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

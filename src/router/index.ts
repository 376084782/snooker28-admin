import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import User from '../views/User.vue'
import Room from '../views/Room.vue'
import { doAjax } from '@/utils/ajax'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/room',
    name: 'Room',
    component: Room
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

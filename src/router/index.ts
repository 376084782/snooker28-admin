import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import User from '../views/User.vue'
import Room from '../views/Room.vue'
import Count from '../views/Count.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import { doAjax } from '@/utils/ajax'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/count',
        name: 'Count',
        component: Count
      },
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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

let flagFirstIn = true
router.beforeEach((to, from, next) => {
  let token = store.state.token;
  if (flagFirstIn) {
    if (!token) {
      store.state.token = localStorage.getItem('token_snooker28') as any
      token = store.state.token;
    }
  }
  if (to.name != "Login") {
    // 检查是否登录
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router

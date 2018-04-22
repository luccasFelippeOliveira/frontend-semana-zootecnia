import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Inscricao from '@/components/Inscricao'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/inscricao',
      name: 'Inscricao',
      component: Inscricao
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})

router.beforeEach((to, from, next) => {
  const pathAdmin = to.path === '/admin'
  const isAuthorized = store.state.isAuthenticated

  if (pathAdmin && !isAuthorized) {
    console.log('you cant go there')
    next('/login')
  } else {
    next()
  }
})

export default router

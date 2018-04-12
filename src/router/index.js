import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Inscricao from '@/components/Inscricao'
import Login from '@/components/Login'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
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

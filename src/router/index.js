import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
const Home = () => import(/* webpackChunkName: "home-welcome" */ '../views/Home.vue')
const Welcome = () => import(/* webpackChunkName: "home-welcome" */ '../views/Welcome.vue')
const User = () => import(/* webpackChunkName: "user" */ '../components/User.vue')
const Friend = () => import(/* webpackChunkName: "friend" */ '../components/Friend.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      { path: '/', name: 'welcome', component: Welcome },
      { path: '/user', name: 'user', component: User },
      { path: '/friend', name: 'friend', component: Friend }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('login_token')
  if (!tokenStr) return next('/login')
  next()
})

export default router

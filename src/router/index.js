import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
const Home = () => import(/* webpackChunkName: "home-welcome" */ '../views/Home.vue')
const Welcome = () => import(/* webpackChunkName: "home-welcome" */ '../views/Welcome.vue')
const User = () => import(/* webpackChunkName: "user" */ '../components/User.vue')
const Friend = () => import(/* webpackChunkName: "friend" */ '../components/Friend.vue')
const Album = () => import(/* webpackChunkName: "album" */ '../components/Album.vue')
const Pictures = () => import(/* webpackChunkName: "pictures" */ '../components/Pictures.vue')
const Reward = () => import(/* webpackChunkName: "reward" */ '../components/Reward.vue')
const Articles = () => import(/* webpackChunkName: "articles" */ '../components/Articles.vue')
const Tags = () => import(/* webpackChunkName: "tags" */ '../components/Tags.vue')
const Type = () => import(/* webpackChunkName: "type" */ '../components/Type.vue')
const Content = () => import(/* webpackChunkName: "content" */ '../components/Content.vue')

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
      { path: '/friend', name: 'friend', component: Friend },
      { path: '/album', name: 'album', component: Album },
      { path: '/pictures', name: 'pictures', component: Pictures },
      { path: '/reward', name: 'reward', component: Reward },
      { path: '/articles', name: 'articles', component: Articles },
      { path: '/tags', name: 'tags', component: Tags },
      { path: '/type', name: 'type', component: Type },
      { path: '/content/:artId', name: 'contents', component: Content }
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

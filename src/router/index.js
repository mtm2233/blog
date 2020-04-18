import Vue from 'vue'
import VueRouter from 'vue-router'
import Blog from '../views/Blog.vue'
import Home from '../views/Home.vue'
import Articles from '../components/Articles.vue'
import Contents from '../components/Contents.vue'
import Friend from '../components/Friend.vue'
import Readers from '../components/Readers.vue'
import Archiv from '../components/Archiv.vue'
import Search from '../components/Search.vue'
import Reward from '../components/Reward.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'blog',
    component: Blog,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        redirect: '/articles',
        children: [
          { path: '/articles', name: 'articles', component: Articles },
          { path: '/content/:artId', name: 'contents', component: Contents }
        ]
      },
      { path: '/friend', name: 'friend', component: Friend },
      { path: '/readers', name: 'readers', component: Readers },
      { path: '/archiv', name: 'archiv', component: Archiv },
      { path: '/search', name: 'search', component: Search },
      { path: '/reward', name: 'reward', component: Reward }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes
})

export default router

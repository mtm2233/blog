import Vue from 'vue'
import VueRouter from 'vue-router'
import Blog from '../views/Blog.vue'
import Home from '../views/Home.vue'
import Articles from '../components/Articles.vue'

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
          { path: '/articles', name: 'articles', component: Articles }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

const Blog = () => import(/* webpackChunkName: "blog-home-articles" */ '../views/Blog.vue')
const Home = () => import(/* webpackChunkName: "blog-home-articles" */ '../views/Home.vue')
const Articles = () => import(/* webpackChunkName: "blog-home-articles" */ '../components/Articles.vue')
const Contents = () => import(/* webpackChunkName: "contents" */ '../components/Contents.vue')
const Friend = () => import(/* webpackChunkName: "friend" */ '../components/Friend.vue')
const Readers = () => import(/* webpackChunkName: "readers" */ '../components/Readers.vue')
const Archiv = () => import(/* webpackChunkName: "archiv" */ '../components/Archiv.vue')
const Search = () => import(/* webpackChunkName: "search" */ '../components/Search.vue')
const Reward = () => import(/* webpackChunkName: "reward" */ '../components/Reward.vue')
const About = () => import(/* webpackChunkName: "about" */ '../components/About.vue')
const Album = () => import(/* webpackChunkName: "album" */ '../components/Album.vue')
const Pictures = () => import(/* webpackChunkName: "pictures" */ '../components/Pictures.vue')

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
      { path: '/reward', name: 'reward', component: Reward },
      { path: '/about', name: 'about', component: About },
      { path: '/album', name: 'album', component: Album },
      { path: '/pictures/:albId', name: 'pictures', component: Pictures }
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

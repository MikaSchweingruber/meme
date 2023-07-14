import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Meme from '../views/Meme.vue'
import RandomMeme from '../components/meme/RandomMeme.vue'
import MemeComponent from '../components/meme/MemeComponent.vue'
import Auth from '../components/meme/Auth.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Meme
  },
  {
    path: '/home',
    name: 'test',
    component: HomeView
  },
  {
    path: '/random',
    name: 'random',
    component: RandomMeme
  },
  {
    path: '/memes/dark',
    name: 'dark',
    component: Meme
  },
  {
    path: '/memes/default',
    name: 'default',
    component: Meme
  },
  {
    path: '/memes/next-level',
    name: 'next level',
    component: Meme
  },
  {
    path: '/auth',
    name: 'auth',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

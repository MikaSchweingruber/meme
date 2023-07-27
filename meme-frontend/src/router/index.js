import Vue from 'vue'
import VueRouter from 'vue-router'
import Meme from '../views/Meme.vue'
import RandomMeme from '../components/meme/RandomMeme.vue'
import MemeComponent from '../components/meme/MemeComponent.vue'
import Login from '../views/Login.vue'
import store from "@/store/index";
import ComingSoon from '../views/ComingSoon.vue'
import Repository from "@/repository/RepositoryFactory"
const auth = Repository.get('auth')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Meme,
    meta: {
      requiresAuth: true
    }
  },
  
  {
    path: '/random',
    name: 'random',
    component: RandomMeme,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/memes/coop',
    name: 'Coop',
    component: Meme,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/memes/Gspässli',
    name: 'Gspässli',
    component: Meme,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/memes/classics',
    name: 'classics',
    component: Meme,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/memes/other',
    name: 'other',
    component: Meme,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: Login
  },
  {
    path: '/comingsoon',
    name: 'comingsoon',
    component: ComingSoon,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const response = await auth.isAuthenticated()
    if (response[0]) {
      store.commit("authenticated", true);
      store.commit("username", response[1].data.username)
      store.commit("firstName", response[1].data.first_name)
      store.commit("lastName", response[1].data.last_name)
      store.commit("emailAddress", response[1].data.email)
      next()
    } else {
      store.commit("authenticated", false);
      next({name: "auth"})
    }
  } else{
    next()
  }
  if (to.name == null){
    next({name: "home"})
  }
})

export default router

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    csrId: 0,
    crtId: 0,
    username:"",
    superuser: false,
    firstName: "",
    lastName: "",
    emailAddress: "",
    snack:[],
    snackColor:[],
    memesreload: false
  },
  mutations: {
    authenticated(state, value){
      state.authenticated = value
    },
    username(state, name){
      state.username = name
    },
    superuser(state, name){
      state.superuser = name
    },
    firstName(state, name){
      state.firstName = name
    },
    lastName(state, name){
      state.lastName = name
    },
    emailAddress(state, email){
      state.emailAddress = email
    },
    snack(state, text){
      state.snack.push(text)
    },
    snackColor(state, color){
      state.snackColor.push(color)
    },
    removeSnack(state){
      state.snack.shift()
    },
    removeSnackColor(state){
      state.snackColor.shift()
    },
    memesreload(state, value){
        state.memesreload = value
    },
  },
  getters: {
    authenticated: (state) => state.authenticated,
    username: (state) => state.username,
    superuser: (state) => state.superuser,
    firstName: (state) => state.firstName,
    lastName: (state) => state.lastName,
    emailAddress: (state) => state.emailAddress,
    snack: (state) => state.snack,
    snackColor: (state) => state.snackColor,
    memesreload: (state) => state.memesreload,
  },
  actions: {
  },
  modules: {
  }
})
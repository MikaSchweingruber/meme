import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueSession from 'vue-session'
import store from './store'


Vue.config.productionTip = false

Vue.use(vuetify)
Vue.use(VueSession)

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')

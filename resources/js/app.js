/* global Vue */

require('./bootstrap')
window.Vue = require('vue')
import axios from 'axios'
import Vuex from 'vuex'
Vue.use(Vuex)

import { store } from './store'

Vue.prototype.$http = axios

import vuetify from './vuetify/index'
import App from './App.vue'

const app = new Vue({
  vuetify,

  el: '#app',

  render: h => h(App)
})

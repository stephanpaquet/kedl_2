/* global Vue */

require('./bootstrap')
window.Vue = require('vue')
import axios from 'axios'

Vue.prototype.$http = axios

import vuetify from './vuetify/index'

import App from './App.vue'

const app = new Vue({
  vuetify,

  el: '#app',

  render: h => h(App)
})

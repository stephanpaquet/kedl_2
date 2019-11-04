require('./bootstrap');
window.Vue = require('vue');

import vuetify from './vuetify/index'

import App  from './App.vue'

const app = new Vue({
    vuetify,

    render: h => h(App),

    el: '#app'
});

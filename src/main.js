import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


import App from './App'


// Vue.prototype.$axios = axios

Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

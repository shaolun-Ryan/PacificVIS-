import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'//引入store
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'


import App from './App'


// Vue.prototype.$axios = axios

Vue.use(VueAxios, axios)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})

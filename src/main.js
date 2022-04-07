import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import VueAxios from "vue-axios"

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const token = localStorage.getItem('user-token')
if(token) {
  axios.defaults.headers.common['Authorization']="Bearer " + token
}

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')


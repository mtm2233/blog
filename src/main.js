import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'

// 导入全局样式表
import './assets/css/global.css'
// 隐藏类
import 'element-ui/lib/theme-chalk/display.css'
Vue.prototype.$http = axios
// axios根路径
axios.defaults.baseURL = 'http://localhost:2541/api/'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

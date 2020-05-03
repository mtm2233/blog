import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/iview.js'
import './assets/css/global.css'
import { LoadingBar } from 'view-design'
// 引入富文本编译器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
// 请求拦截器 携带logintoken
// 拦截时，显示进度条
axios.interceptors.request.use(config => {
  LoadingBar.start()
  config.headers.logintoken = window.sessionStorage.getItem('logintoken')
  // 在最后必须return config
  return config
})
// 在response 拦截器中，隐藏进度条
axios.interceptors.response.use(config => {
  LoadingBar.finish()
  return config
})

// 时间过滤器
Vue.filter('timefilters', function (val) {
  if (val === null || val === '') {
    return '暂无时间'
  } else {
    const d = new Date(val)
    const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    const sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
    const times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec
    return times
  }
})
// 默认头像的颜色
Vue.filter('hashColor', function (email) {
  const colours = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#ecf0f1',
    '#95a5a6',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#bdc3c7',
    '#7f8c8d'
  ]
  // 定义hashCode变量
  const str = email.slice(0, 6)
  let hashCode = 0
  // 霍纳法则，来计算hashCode的值
  // cats => Unicode编码
  for (let i = 0; i < str.length; i++) {
    hashCode = 37 * hashCode + str.charCodeAt(i)
  }
  // 取余操作
  const index = hashCode % 19
  return 'background-color:' + colours[index]
})

Vue.prototype.$http = axios
// axios根路径
axios.defaults.baseURL = 'https://api.youcann.club/'

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

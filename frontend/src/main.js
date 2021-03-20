import '@/icons'
import '@/utils/permission'
import '@/styles/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import Vue from 'vue'
import VueParticles from 'vue-particles'
import App from './App'
import router from './router'
import store from './store'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.prototype.$bus = new Vue()

Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})

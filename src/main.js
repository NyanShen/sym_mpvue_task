import Vue from 'vue'
import App from './App'

import miniapp from './utils/miniapp.api'

Vue.prototype.$miniapp = miniapp                         //全局引入，小程序api定义

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

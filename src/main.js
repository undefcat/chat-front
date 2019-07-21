import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import bus from './api/eventbus'
import ws from './api/websocket'

Vue.prototype.$bus = bus
Vue.prototype.$ws = new ws()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


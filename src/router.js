import Vue from 'vue'
import Router from 'vue-router'
import Main from './pages/index/App.vue'
import Room from './pages/room/App.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    }, {
      path: '/rooms/:id',
      name: 'room',
      component: Room,
    },
  ]
})

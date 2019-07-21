import Vue from 'vue'
import Vuex from 'vuex'
import ws from './api/websocket'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
    },
    rooms: [],
    messages: [],
    userList: [],
  },
  mutations: {
    setName(state, data) {
      state.user.name = data.name
    },
    roomList(state, data) {
      state.rooms = data.rooms
    },
    userList(state, data) {
      state.userList = data.userList
    },
    chatMessage(state, data) {
      state.messages.push(data)
    }
  },
  actions: {
    setName(_, data) {
      ws.send('setName', data)
    },
    setNameRes({ commit }, data) {
      commit('setName', data)
    },
    roomListRes({ commit }, data) {
      commit('roomList', data)
    },
    createRoom(_, data) {
      ws.send('createRoom', data)
    },
    joinRoom(_, data) {
      ws.send('joinRoom', data)
    },
    joinRoomRes(_, data) {
      if (!data.ok) {
        return
      }

      router.push(`/rooms/${data.id}`)
    },
    leaveRoom() {
      ws.send('leaveRoom')
    },
    userListRes({ commit }, data) {
      commit('userList', data)
    },
    chatMessage(_, data) {
      ws.send('chatMessage', data)
    },
    chatMessageRes({ commit }, data) {
      commit('chatMessage', data)
    }
  }
})

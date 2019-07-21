import Vue from 'vue'
import Vuex from 'vuex'
import ws from './api/websocket'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: -1,
      name: '',
    },
    rooms: [],
    room: {},
    messages: [],
    userList: [],
  },
  mutations: {
    setName(state, data) {
      state.user.id = data.id
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
    },
    notice(state, data) {
      state.messages.push(data)
    },
    joinRoom(state, data) {
      state.room = data
    },
    clearRoom(state) {
      state.room = {}
      state.messages = []
      state.userList = []
    }
  },
  actions: {
    setName({ state }, data) {
      if (state.user.name !== '') {
        return
      }

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
    joinRoomRes({ state, commit }, data) {
      if (!data.ok) {
        return
      }

      const room = state.rooms.find(room => room.id === data.id)
      commit('joinRoom', room)

      router.push(`/rooms/${data.id}`)
    },
    leaveRoom({ commit }) {
      ws.send('leaveRoom')
      commit('clearRoom')
    },
    userListRes({ commit }, data) {
      commit('userList', data)
    },
    chatMessage(_, data) {
      ws.send('chatMessage', data)
    },
    chatMessageRes({ commit }, data) {
      commit('chatMessage', data)
    },
    noticeRes({ commit }, data) {
      commit('notice', data)
    }
  }
})

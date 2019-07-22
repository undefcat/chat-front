import Vue from 'vue'
import Vuex from 'vuex'
import ws from './api/websocket'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDisconnected: false,
    user: {
      id: -1,
      name: '',
    },
    rooms: [],
    room: {},
    messages: [],
    userList: [],
    chatTarget: -1,
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
    whisperMessage(state, data) {
      state.messages.push(data)
    },
    joinRoom(state, data) {
      state.room = data
    },
    clearRoom(state) {
      state.room = {}
      state.messages = []
      state.userList = []
    },
    chatTarget(state, id) {
      state.chatTarget = id
    },
    close(state) {
      state.isDisconnected = true
    },
    error(state) {
      state.isDisconnected = true
    },
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
        window.alert('방이 꽉 찼습니다.')
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
    message({ state }, data) {
      if (state.chatTarget === -1) {
        ws.send('chatMessage', data)
      } else {
        const whisperMessage = {
          id: 0,
          fromID: 0 ,
          toID: state.chatTarget,
          content: data.content,
        }

        ws.send('whisperMessage', whisperMessage)
      }
    },
    chatMessageRes({ commit }, data) {
      commit('chatMessage', data)
    },
    noticeRes({ commit }, data) {
      commit('notice', data)
    },
    whisperMessageRes({ state, commit }, data) {
      const from = state.userList.find(user => user.id === data.fromID)
      const to = state.userList.find(user => user.id === data.toID)

      commit('whisperMessage', {... data, fromName: from.name, toName: to.name })
    }
  },
})

<template>
  <div id="room">
    <h1>{{ room.title }}</h1>
    <el-container>
      <el-container>
        <el-main
            id="chatWrapper"
            ref="chat"
            class="box">
          <Chat @scroll="scroll"/>
        </el-main>
        <el-footer
            id="inputWrapper"
            class="box">
          <el-select
              v-model="chatTarget"
              @change="changeChatTarget">
            <el-option
              v-for="target in chatTargetList"
              :key="target.id"
              :label="target.name"
              :value="target.id"/>
          </el-select>
          <InputMessage />
        </el-footer>
      </el-container>
      <el-aside
          id="userListWrapper"
          class="box"
          width="200px">
        <UserList />
      </el-aside>
    </el-container>
    <el-container class="out">
      <el-button @click="out">나가기</el-button>
    </el-container>
  </div>
</template>

<script>
  import Chat from './Chat.vue'
  import UserList from './UserList.vue'
  import InputMessage from './InputMessage'
  import { mapState } from 'vuex'

  export default {
    name: 'App',
    components: { Chat, UserList, InputMessage },
    data() {
      return {
        chatTarget: -1,
      }
    },
    computed: {
      ...mapState(['room']),
      chatTargetList() {
        const all = { id: -1, name: '모두에게' }
        return [all, ...this.$store.state.userList]
          .filter(user => user.id !== this.$store.state.user.id)
      },
    },
    methods: {
      scroll() {
        this.$nextTick(() => {
          const chat = this.$refs.chat.$el
          const isScrollable = chat.scrollTop < chat.scrollHeight - chat.clientHeight - 1

          if (isScrollable) {
            chat.scrollTop = chat.scrollHeight - chat.clientHeight + 10
          }
        })
      },
      out() {
        this.$router.replace('/')
      },
      changeChatTarget() {
        this.$store.commit('chatTarget', this.chatTarget)
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.dispatch('leaveRoom')
      next()
    },
  }
</script>

<style scoped>
  h1 {
    text-align: center;
  }

  #room {
    width: 1000px;
    margin: 0 auto;
  }

  #inputWrapper {
    padding-top: 10px;
  }

  .el-main {
    height: 500px;
  }

  .box {
    box-sizing: border-box;
    margin: 10px;
    box-shadow: 0 0 10px #eee;
  }

  .out {
    float: right;
  }

  .out > .el-button {
    margin-right: 10px;
  }
</style>
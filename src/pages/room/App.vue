<template>
  <div id="room">
    <h1>{{ room.title }}</h1>
    <el-container>
      <el-container>
        <el-main
            id="chatWrapper"
            class="box">
          <Chat />
        </el-main>
        <el-footer
            id="inputWrapper"
            class="box">
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
    computed: {
      ...mapState(['room']),
    },
    beforeRouteLeave(to, from, next) {
      this.$store.dispatch('leaveRoom')
      next()
    }
  }
</script>

<style scoped>
  h1 {
    text-align: center;
  }

  #room {
    max-width: 1000px;
    margin: 0 auto;
  }

  .el-main {
    height: 500px;
  }

  .box {
    box-sizing: border-box;
    margin: 10px;
    box-shadow: 0 0 10px #eee;
  }
</style>
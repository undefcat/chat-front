<template>
  <div id="main">
    <h1>Open Chat</h1>
    <ChatRoomList />
    <el-dialog
        title="닉네임 설정"
        width="35%"
        :visible.sync="isOpen"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        v-loading="isRequest">
      <el-form :model="form" @submit.native.prevent>
        <el-form-item
            label="이름"
            label-width="120px">
          <el-input
              v-model="form.name"
              autocomplete="off"
              @keydown.native.enter="setName"
              autofocus/>
        </el-form-item>
      </el-form>
      <div
          slot="footer"
          class="dialog-footer">
        <el-button
            type="primary"
            @click="setName">
          확인
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ChatRoomList from './ChatRoomList.vue'
  export default {
    name: 'App',
    components: { ChatRoomList },
    data() {
      return {
        isRequest: false,
        form: {
          name: '',
        },
      }
    },
    computed: {
      isOpen() {
        return this.$store.state.user.name === ''
      },
    },
    methods: {
      showCreateRoomDialog(rooms) {
        this.rooms = rooms
      },
      setName() {
        const name = this.form.name.trim()
        if (name.length < 2 || name.length > 16) {
          this.$message({
            type: 'error',
            message: '이름은 2글자 ~ 16글자여야 합니다.',
          })
          return
        }

        this.$store.dispatch('setName', { name: this.form.name })
        this.isRequest = true
      }
    },
  }
</script>

<style scoped>
  #main {
    width: 600px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
  }
</style>
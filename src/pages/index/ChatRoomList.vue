<template>
  <div>
    <el-card v-if="rooms.length === 0">
      개설된 채팅방이 없습니다.
    </el-card>
    <chat-room
        v-else
        v-for="room in rooms"
        :key="room.id"
        :room="room"/>
    <el-card id="addRoom">
      <el-button
          @click="showCreateRoomDialog"
          icon="el-icon-plus"
          circle/>
    </el-card>
    <el-dialog
        title="채팅방 만들기"
        width="35%"
        :visible.sync="isOpen">
      <el-form
          @submit.native.prevent
          :model="form">
        <el-form-item
            label="이름"
            label-width="120px">
          <el-input
              ref="roomTitle"
              v-model="form.title"
              @keydown.native.enter="createRoom"
              autocomplete="off"/>
        </el-form-item>
        <el-form-item
            label="인원(최대 16명)"
            label-width="120px">
          <el-input-number
              v-model.number="form.total"
              :min="2"
              :max="16"/>
        </el-form-item>
      </el-form>
      <div
          slot="footer"
          class="dialog-footer">
        <el-button @click="closeCreateRoomDialog">
          닫기
        </el-button>
        <el-button
            type="primary"
            @click="createRoom">
          생성
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ChatRoom from './ChatRoom.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'ChatRoomList',
    components: { ChatRoom },
    computed: {
      ...mapState(['rooms'])
    },
    data() {
      return {
        isOpen: false,
        form: {
          title: '',
          total: 6,
        },
      }
    },
    methods: {
      showCreateRoomDialog() {
        this.isOpen = true
        this.$nextTick(() => {
          this.$refs.roomTitle.focus()
        })
      },
      closeCreateRoomDialog() {
        this.isOpen = false
        this.form.title = ''
        this.form.total = 6
      },
      createRoom() {
        let { title, total } = this.form

        title = title.trim()
        if (title === '') {
          this.$message({
            type: 'error',
            message: '최소 1글자 이상 입력해주세요.',
          })
          return
        }

        if (total < 2 || total > 16) {
          this.$message({
            type: 'error',
            message: '최소 2명, 최대 16명까지 입력하셔야 합니다.'
          })

          return
        }

        this.$store.dispatch('createRoom', { title, total })
        this.closeCreateRoomDialog()
      },
    },
  }
</script>

<style scoped>
  div > .el-card {
    margin-bottom: 10px;
  }

  #addRoom {
    text-align: center;
  }
</style>
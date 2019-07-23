<template>
  <ul id="userList">
    <user
        v-for="user in userList"
        :key="user.id"
        :user="user"/>
  </ul>
</template>

<script>
  import User from './User.vue'

  export default {
    name: 'UserList',
    components: { User },
    computed: {
      userList() {
        const roomMaker = this.$store.state.room.roomMaker
        const userList = [...this.$store.state.userList]

        return userList.sort((a, b) => {
          const [ra, rb] = [roomMaker-a.id, roomMaker-b.id]

          // 둘 다 방장이 아니면
          if (ra * rb !== 0) {
            return 0
          }

          // 방장이 맨 앞으로
          return Math.abs(ra)  - Math.abs(rb)
        })
      },
    }
  }
</script>

<style scoped>
  #userList {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
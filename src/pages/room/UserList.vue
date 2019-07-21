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
    data() {
      return {
        userList: [],
      }
    },
    mounted() {
      this.$bus.$on('userList', data => {
        this.userList = data.userList
      })
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
<template>
  <div id="main">
    <h1>Open Chat</h1>
    <ChatRoomList :rooms="rooms"/>
  </div>
</template>

<script>
  import ChatRoomList from './ChatRoomList.vue'
  export default {
    name: 'App',
    components: { ChatRoomList },
    data() {
      return {
        rooms: [],
      }
    },
    methods: {
      showCreateRoomDialog(rooms) {
        this.rooms = rooms
      }
    },
    mounted() {
      this.$store.dispatch('setName', {name: 'name'})
    }
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
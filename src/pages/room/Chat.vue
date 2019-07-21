<template>
  <div id="chat">
    <message
        v-for="message in messages"
        :key="message.id"
        :message="message"/>
  </div>
</template>

<script>
  import Message from './Message.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'Chat',
    components: { Message },
    computed: {
      ...mapState(['messages'])
    },
    beforeRouteLeave(to, from, next) {
      // this.$ws.send('')
      next()
    },
  }
</script>

<style scoped>
  #chat {
    width: 100%;
    height: 5000px;
  }
</style>
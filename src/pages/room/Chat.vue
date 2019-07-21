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
  export default {
    name: 'Chat',
    components: { Message },
    data() {
      return {
        messages: []
      }
    },
    mounted() {
      this.$bus.$on('chatMessage', data => {
        const { id, name, content } = data
        this.messages.push({
          id, name, content
        })
      })
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
<template>
  <div
      id="chat"
      ref="chat">
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
      ...mapState(['messages']),
    },
    watch: {
      messages() {
        this.$emit('scroll')
      },
    },
  }
</script>

<style scoped>
  #chat {
    width: 100%;
  }
</style>
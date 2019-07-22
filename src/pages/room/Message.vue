<template>
  <div :class="{me: isMe}">
    <component
        :is="currentMessage"
        class="message"
        :isMe="isMe"
        :message="message"/>
  </div>
</template>

<script>
  import ChatMessage from './ChatMessage.vue'
  import NoticeMessage from './NoticeMessage.vue'
  import WhisperMessage from './WhisperMessage.vue';
  export default {
    name: 'Message',
    components: { ChatMessage, NoticeMessage, WhisperMessage },
    props: {
      message: {
        type: Object,
        default() {
          return {
            id: Math.random(),
            noticeType: null,
            name: '',
            content: '',
            fromName: '',
            toName: '',
          }
        },
      },
    },
    computed: {
      isMe() {
        const myID = this.$store.state.user.id
        const messageID = this.message.userID >= 0 ? this.message.userID : this.message.fromID

        return myID === messageID
      },
      currentMessage() {
        switch (this.message.type) {
          case 'chatMessage':
            return ChatMessage

          case 'notice':
            return NoticeMessage

          case 'whisperMessage':
            return WhisperMessage
        }

        return ChatMessage
      }
    }
  }
</script>

<style scoped>
  .message::after {
    content: '';
    display: block;
    clear: both;
  }

  .me {
    color: navy;
    font-weight: bold;
  }

</style>
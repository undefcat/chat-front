<template>
  <div class="chatMessage">
    <div class="user">{{ message.name }}</div>
    <div class="content">: {{ message.content }}</div>
  </div>
</template>

<script>
  export default {
    name: 'ChatMessage',
    props: {
      isMe: {
        type: Boolean,
        default: false,
      },
      message: {
        type: Object,
      },
    },
  }
</script>

<style scoped>
  .chatMessage::after {
    content: '';
    display: block;
    clear: both;
  }

  .chatMessage > div {
    float: left;
  }

  .user {
    width: 120px;
    margin-right: 10px;
    text-align: right;
    overflow: hidden;
  }

  .content {
    width: 580px;
    word-break: break-all;
  }
</style>
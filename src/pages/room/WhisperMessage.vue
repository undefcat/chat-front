<template>
  <div class="whisper">
    <div class="user">
      👂
      <span v-if="isSend">{{ message.toName }}</span>
      <span v-else>{{ message.fromName }}</span>
    </div>
    <div class="content">: {{ message.content }}</div>
  </div>
</template>

<script>
  export default {
    name: 'WhisperMessage',
    props: {
      isMe: {
        type: Boolean,
        default: false,
      },
      message: {
        type: Object,
      },
    },
    computed: {
      isSend() {
        return this.$store.state.user.id === this.message.fromID
      },
    }
  }
</script>

<style scoped>
  .whisper {
    color: green;
  }

  .whisper > div {
    float: left;
  }

  .user {
    width: 120px;
    margin-right: 10px;
    text-align: right;
    overflow: hidden;
  }

  .content {
    width: 560px;
    word-break: break-all;
  }
</style>
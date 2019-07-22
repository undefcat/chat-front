<template>
  <div class="notice" :class="message.noticeType">
    {{ message.content }}
  </div>
</template>

<script>
  export default {
    name: 'NoticeMessage',
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
  .notice {
    text-align: center;
  }

  .enter {
    color: blue;
    font-weight: bold;
  }

  .leave {
    color: red;
    font-weight: bold;
  }
</style>
<template>
  <div :class="message.noticeType">
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
  .enter {
    color: blue;
    font-weight: bold;
  }

  .leave {
    color: red;
    font-weight: bold;
  }
</style>
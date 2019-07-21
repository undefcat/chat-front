<template>
  <div :class="{me: isMe}">
    <div v-if="message.noticeType" :class="message.noticeType">
      {{ message.content }}
    </div>
    <div v-else class="message">
      <div class="user">{{ message.name }}</div>
      <div class="content">: {{ message.content }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    props: {
      message: {
        type: Object,
        default() {
          return {
            id: Math.random(),
            noticeType: null,
            name: 'hi',
            content: 'hello',
          }
        }
      }
    },
    computed: {
      isMe() {
        return this.$store.state.user.id === this.message.userID
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
  .message > div {
    float: left;
  }

  .user {
    width: 20%;
    margin-right: 10px;
    overflow: hidden;
  }

  .content {
    width: 75%;
    word-break: break-all;
  }

  .me {
    color: navy;
    font-weight: bold;
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
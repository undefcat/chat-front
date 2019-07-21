<template>
  <div id="input">
    <el-input
        v-model="message"
        place-holder="메세지 입력..."
        @keydown.native.enter="send"
    />
  </div>
</template>

<script>
  export default {
    name: 'InputMessage',
    data() {
      return {
        message: '',
      }
    },
    methods: {
      send() {
        const message = this.message.trim()

        if (message === '') {
          return
        }

        this.message = ''
        this.$ws.send('chatMessage', { id: 0, name: '', content: message })
      }
    }
  }
</script>

<style scoped>
  #input {
    position: relative;
    width: 100%;
    height: 100%;
    margin-top: 10px;
  }

  #inputItem {
    width: 80%;
    margin: 0;
  }

  #submitItem {
    width: 20%;
    margin: 0;
  }
</style>
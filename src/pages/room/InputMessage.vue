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
        this.$store.dispatch('message', { id: 0, name: '', content: message })
      },
    },
  }
</script>

<style scoped>
  #input {
    position: relative;
    width: 480px;
    height: 100%;
    float: right;
  }

</style>
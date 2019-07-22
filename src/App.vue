<template>
  <div id="app">
    <div id="disconnected"
         v-show="isDisconnected">
      <h1>연결이 만료되었습니다. 다시 접속해주세요.</h1>
    </div>
    <router-view />
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'App',
    computed: {
      ...mapState(['isDisconnected']),
    },
  }
</script>

<style scoped>
  #disconnected {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
  }

  h1 {
    text-align: center;
  }
</style>
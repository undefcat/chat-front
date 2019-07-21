<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      this.$bus.$on('joinRoom', data => {
        const { id, ok } = data
        if (!ok) {
          this.$message({
            type: 'error',
            message: '채팅방 접속 실패...',
          })
          return
        }

        this.$router.push(`/rooms/${id}`)
      })
    }
  }
</script>
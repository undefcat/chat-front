<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        isRequest: false,
        form: {
          name: '',
        },
      }
    },
    computed: {
      isOpen() {
        return this.$store.state.user.name === ''
      },
    },
    methods: {
      setName() {
        const name = this.form.name.trim()
        if (name.length < 2 || name.length > 16) {
          this.$message({
            type: 'error',
            message: '이름은 2글자 ~ 16글자여야 합니다.',
          })
          return
        }

        this.$store.dispatch('setName', { name: this.form.name })
        this.isRequest = true
      },
    },
  }
</script>
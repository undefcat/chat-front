<template>
  <li>{{ user.name }}</li>
</template>

<script>
  export default {
    name: 'User',
    props: {
      user: {
        type: Object,
        default() {
          return {
            id: Math.random(),
            name: 'noname',
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
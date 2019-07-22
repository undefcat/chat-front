<template>
  <li class="user">{{ user.name }}</li>
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
  .user {
    box-sizing: border-box;
    padding: 10px;
    cursor: default;
  }
</style>
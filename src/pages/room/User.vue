<template>
  <li
      class="user"
      :class="{ban: hasSuperAuth && !isMe}"
      @click="banUser">
    <span v-if="isSuper">👑</span>
    {{ user.name }}
  </li>
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
        },
      },
    },
    computed: {
      isSuper() {
        return this.$store.state.room.roomMaker === this.user.id
      },
      hasSuperAuth() {
        return this.$store.state.room.roomMaker === this.$store.state.user.id
      },
      isMe() {
        return this.$store.state.user.id === this.user.id
      },
    },
    methods: {
      banUser() {
        if (this.hasSuperAuth && !this.isMe) {
          this.$store.dispatch('banUser',
            { id: this.$store.state.user.id, banID: this.user.id })
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

  .ban {
    cursor: not-allowed;
  }
</style>
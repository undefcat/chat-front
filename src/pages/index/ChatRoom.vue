<template>
  <el-card>
    <h3>{{ room.title }}</h3>
    <div class="cfx">
      <div class="participants">
        {{ room.current }} / {{ room.total }}
      </div>
      <div class="join">
        <el-button @click="enter" :disabled="isFull">참가</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'ChatRoom',
    props: {
      room: {
        type: Object,
        default() {
          return {
            id: 0,
            title: '',
            total: 0,
            current: 0,
          }
        },
      },
    },
    computed: {
      isFull() {
        return this.room.total === this.room.current
      },
    },
    methods: {
      enter() {
        this.$store.dispatch('joinRoom', { id: this.room.id })
      },
    },
  }
</script>

<style scoped>
  .cfx::after {
    content: '';
    display: block;
    clear: both;
  }

  .participants {
    float: left;
  }

  .join {
    float: right;
  }
</style>
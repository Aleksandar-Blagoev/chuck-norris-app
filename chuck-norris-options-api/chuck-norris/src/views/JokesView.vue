<template>
  <div class="jokes-view">
    <JokeContainer />
  </div>
</template>

<script>
import JokeContainer from '@/components/Jokes/JokeContainer.vue'
  export default  {
    components: {
      JokeContainer
    }
  }
</script>

<style scoped>
@media (min-width: 1024px) {
  .jokes-view {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

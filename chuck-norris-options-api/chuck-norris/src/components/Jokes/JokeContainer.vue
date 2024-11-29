<template>
  <div class="mb-5">
    <div class="d-flex gap-3 fixed-width">
      <JokeDropdown v-model:category="selectedCategory"  />
      <JokeButton :selectedCategory="selectedCategory" />
    </div>
    <div>
      <JokeCard />
    </div>
  </div>
</template>

<script>
import JokeDropdown from '@/components/Jokes/JokeDropdown.vue'
import JokeButton from  '@/components/Jokes/JokeButton.vue'
import JokeCard from '@/components/Jokes/JokeCard.vue'
export default {
  name: 'JokeContainer',
  components: {
    JokeDropdown,
    JokeButton,
    JokeCard,
  },
  data() {
    return {
      selectedCategory: '',
    }
  }
}
</script>

<style scoped>
  .fixed-width {
    width: 500px;
  }
</style>

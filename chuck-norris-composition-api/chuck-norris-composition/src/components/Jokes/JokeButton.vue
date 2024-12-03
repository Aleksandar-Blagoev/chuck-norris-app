<template>
  <div v-if="isInHome">
    <RouterLink :to="{ path: '/jokes' }" class="btn btn-primary mt-4 w-50">
      Get Jokes
    </RouterLink>
  </div>
  <div v-else>
    <button class="btn btn-primary mt-auto get-joke" @click="handleClick">
      Get Joke
    </button>
  </div>
</template>


<script setup>
import { computed } from "vue";
import { useJokeStore } from '@/stores/jokeStore.js';
import { useRoute } from 'vue-router';

  const props = defineProps({
    selectedCategory: {
      type: String,
      required: true,
    },
  });

  const jokeStore = useJokeStore();
  const route = useRoute();

  const isInHome = computed(() => {
    const endPath = route.path.split('/').pop().toLowerCase();
    return endPath === '' || endPath === 'home';
  });

  const handleClick = async () => {
    try {
      if (props.selectedCategory) {
        await jokeStore.addJokeByCategory(props.selectedCategory);
      } else {
        await jokeStore.addRandomJoke();
      }
      console.log('Fetched Joke:', jokeStore.currentJoke);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }

    localStorage.setItem("currentJoke", JSON.stringify(jokeStore.currentJoke));
  };

</script>

<style scoped>
@import "@/assets/styles/jokeButton.css";
</style>



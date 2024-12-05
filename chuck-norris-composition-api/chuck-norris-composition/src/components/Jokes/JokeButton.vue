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
import isHomePage from "@/utilities/isInHome.js";
import saveToLocal from "@/utilities/saveToLocal.js";

  const props = defineProps({
    selectedCategory: {
      type: String,
      required: false,
    },
  });

  const jokeStore = useJokeStore();

  const isInHome = computed(isHomePage);

  const handleClick = async () => {
    try {
      if (props.selectedCategory) {
        await jokeStore.addJokeByCategory(props.selectedCategory);
      } else {
        await jokeStore.addRandomJoke();
      }
      console.log('Fetched Joke:', jokeStore.currentJoke);
    } catch (error) {
      console.log('Error fetching joke:', error);
    }

    saveToLocal("currentJoke", jokeStore.currentJoke);
  };

</script>

<style scoped>
@import "@/assets/styles/jokeButton.css";
</style>



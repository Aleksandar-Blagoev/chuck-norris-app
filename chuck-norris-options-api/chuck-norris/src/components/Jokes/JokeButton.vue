<template>
  <div v-if="isInHome">
    <RouterLink :to="{ path: '/jokes' }" class="btn btn-primary mt-4 w-50">Get jokes</RouterLink>
  </div>
  <div v-else>
    <a class="btn btn-primary mt-auto get-joke" @click="handleClick">Get joke</a>
  </div>
</template>

<script>
import { useJokeStore } from '@/stores/jokeStore.js'
import { useRoute } from 'vue-router'

export default {
  name: 'JokeButton',
  props: {
    selectedCategory: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      jokeStore : useJokeStore(),
      route: useRoute(),
    }
  },
  computed: {
    isInHome() {
      const endPath = this.route.path.split("/").pop().toLowerCase();
      return endPath !== "jokes" && endPath !== "favourites";
    },
  },
  methods: {
    async handleClick() {

      if (this.selectedCategory) {
        // Fetch joke by selected category
        await this.jokeStore.addJokeByCategory(this.selectedCategory);
      } else {
        // Fetch random joke if no category is selected
        await this.jokeStore.addRandomJoke();
      }

      localStorage.setItem("currentJoke", JSON.stringify(this.jokeStore.currentJoke));
    },
  },
};
</script>

<style scoped>
  .get-joke {
    width: 100px;
  }
</style>

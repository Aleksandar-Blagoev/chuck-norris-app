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
      required: false,
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
        await this.jokeStore.addJokeByCategory(this.selectedCategory);
      } else if(this.selectedCategory === '') {
        await this.jokeStore.addRandomJoke();
      } else {
        this.$router.push({ path: "/error" });
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
  .btn-primary:hover {
    box-shadow: 0 8px 12px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
  }
</style>

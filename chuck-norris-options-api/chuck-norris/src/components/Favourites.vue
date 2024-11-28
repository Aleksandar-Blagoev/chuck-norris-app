<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 mb-4" v-for="joke in jokeStoreFavourites" :key="joke.id">
        <JokeCard :joke="joke" />
      </div>
    </div>
  </div>
</template>

<script>
import { useJokeStore } from "@/stores/jokeStore.js";
import JokeCard from "@/components/Jokes/JokeCard.vue";
import useFetchChuckNorrisApi from '@/utilities/fetchUtils.js'

export default {
  name: "Favorites",
  components: {
    JokeCard,
  },
  data() {
    return {
      jokeStore: useJokeStore(),
      fetchChuck: useFetchChuckNorrisApi(),
      favourites: null
    }
  },
  beforeMount() {
    const fetchFavourites = async () => {
      const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || this.jokeStore.favourites;

      if (storedFavourites.length === 0) {
        console.log("No favourites found in localStorage.");
        return;
      }

      const existingIds = this.jokeStore.favouritesObjects.map((joke) => joke.id);

      const idsToFetch = storedFavourites.filter((id) => !existingIds.includes(id));

      if (idsToFetch.length === 0) {
        console.log("All favourites already fetched.");
        return;
      }

      try {
        const newJokes = await Promise.all(
          idsToFetch.map((id) => this.fetchChuck.fetchJokeById(id))
        );

        this.jokeStore.favouritesObjects = [
          ...this.jokeStore.favouritesObjects,
          ...newJokes,
        ];

        console.log("Fetched new favourites:", newJokes);
      } catch (err) {
        console.error("Error fetching favourites:", err);
      }
    };

    fetchFavourites();
  },
  computed: {
    jokeStoreFavourites() {
      return this.jokeStore.favouritesObjects || [];
    },
  },
};
</script>


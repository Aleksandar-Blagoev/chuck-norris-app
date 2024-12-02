<template>
  <div class="container mt-4">
    <div v-if="showAlert" class="alert alert-info text-center" role="alert">
      You don't have Favourites ! <br>
      <span class="countdown">Redirected in {{countdown}}</span>
    </div>

    <div v-if="isLoading" class="loading-div">
      <div class="loading-container">
        <img
          src="https://www.svgrepo.com/show/493732/spinner-loading-dots.svg"
          alt="Loading..."
          class="loading-spinner"
        />
        <p class="loading-text">Fetching jokes, please wait...</p>
      </div>
    </div>

    <div v-else class="row">
      <div class="col-lg-6" v-for="joke in jokeStoreFavourites" :key="joke.id">
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
      isLoading: false,
      showAlert: false,
      countdown: 5,
    }
  },
  beforeMount() {
    const fetchFavourites = async () => {
      const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || this.jokeStore.favourites;
      this.isLoading = true;

      if (storedFavourites.length === 0) {
        console.log("No favourites found in localStorage.");
        this.showAlert = true;

        this.alertIntervalId = setInterval(() => {
          if(this.countdown > 0) {
            this.countdown--;
          } else  {
            this.showAlert = false;
            this.$router.push({ path: "/jokes" });
          }
        }, 1000);

        this.isLoading = false;
        return;
      }

      const existingIds = this.jokeStore.favouritesObjects.map((joke) => joke.id);

      const idsToFetch = storedFavourites.filter((id) => !existingIds.includes(id));

      if (idsToFetch.length === 0) {
        console.log("All favourites already fetched.");
        this.isLoading = false;
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
        console.log("Error fetching favourites:", err);
        this.$router.push("/error");
      } finally {
        this.isLoading = false;
      }
    };

    fetchFavourites();
  },
  beforeUnmount() {
    clearInterval(this.alertIntervalId);
  },
  computed: {
    jokeStoreFavourites() {
      return this.jokeStore.favouritesObjects || [];
    },
  },
};
</script>

<style scoped>
  .loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;
    background-color: #f4f4f9;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    padding: 1.5rem;
  }

  .loading-spinner {
    width: 100px; /* Adjust size as needed */
    height: 100px;
    margin-bottom: 1rem;
    animation: rotate 2s linear infinite;
  }

  .loading-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #555;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .alert {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1050;
    width: 80%;
    max-width: 500px;
  }

  .countdown {
    margin-left: 1rem;
    color: black;
    font-weight: bold;

  }
</style>

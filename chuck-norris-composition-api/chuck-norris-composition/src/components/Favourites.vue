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

<script setup>
import { ref, computed, onBeforeMount, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useJokeStore } from "@/stores/jokeStore.js";
import useFetchChuckNorrisApi from "@/utilities/fetchUtils.js";
import JokeCard from "@/components/Jokes/JokeCard.vue";


  const jokeStore = useJokeStore();
  const fetchChuck = useFetchChuckNorrisApi();
  const router = useRouter();
  let alertIntervalId = null;

  const isLoading = ref(false);
  const showAlert = ref(false);
  const countdown = ref(5);

  const jokeStoreFavourites = computed(() => {
    return jokeStore.favouritesObjects || [];
  });

  const fetchFavourites = async () => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || jokeStore.favourites;
    isLoading.value = true;

    if (storedFavourites.length === 0) {
      console.log("No favourites found in localStorage.");
      showAlert.value = true;

      alertIntervalId = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          showAlert.value = false;
          clearInterval(alertIntervalId);
          router.push({ path: "/jokes" });
        }
      }, 1000);

      isLoading.value = false;
      return;
    }

    const existingIds = jokeStore.favouritesObjects.map((joke) => joke.id);
    const idsToFetch = storedFavourites.filter((id) => !existingIds.includes(id));

    if (idsToFetch.length === 0) {
      console.log("All favourites already fetched.");
      isLoading.value = false;
      return;
    }

    try {
      const newJokes = await Promise.all(
        idsToFetch.map((id) => fetchChuck.fetchJokeById(id))
      );

      jokeStore.favouritesObjects = [...jokeStore.favouritesObjects, ...newJokes];

      console.log("Fetched new favourites:", newJokes);
    } catch (err) {
      console.log("Error fetching favourites:", err);
      router.push("/error");
    } finally {
      isLoading.value = false;
    }
  };

  onBeforeMount(() => {
    fetchFavourites();
  });

  onBeforeUnmount(() => {
    clearInterval(alertIntervalId);
  });

</script>

<style scoped>
@import "@/assets/styles/favourites.css";
</style>

import { ref } from 'vue'
import { defineStore } from 'pinia';
import useFetchChuckNorrisApi from '../utilities/fetchUtils.js';

export const useJokeStore = defineStore('jokeStore', () => {
  const { fetchRandomJoke, fetchRandomJokeByCategory, fetchJokeCategories } = useFetchChuckNorrisApi();

  // State
  const currentJoke = ref(null); // Holds the current joke
  const categories = ref([]); // Array to store categories
  const loading = ref(false); // Loading state
  const favourites = ref([]); // Array to store favorite jokes
  const favouritesObjects = ref([]);
  const error = ref(null); // Error state

  // Actions
  const loadCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      categories.value = await fetchJokeCategories();
    } catch (err) {
      error.value = err.message || 'Failed to load categories';
    } finally {
      loading.value = false;
    }
  };

  const addRandomJoke = async () => {
    loading.value = true;
    error.value = null;
    try {
      const joke = await fetchRandomJoke();
      currentJoke.value = joke;
    } catch (err) {
      error.value = err.message || 'Failed to load a random joke';
    } finally {
      loading.value = false;
    }
  };

  const addJokeByCategory = async (category) => {
    loading.value = true;
    error.value = null;
    try {
      const joke = await fetchRandomJokeByCategory(category);
      currentJoke.value = joke;
    } catch (err) {
      error.value = err.message || `Failed to load a joke from category: ${category}`;
    } finally {
      loading.value = false;
    }
  };

  const addToFavourites = (joke) => {
    const favouritesJokes = favourites.value.length
      ? [...favourites.value]
      : JSON.parse(localStorage.getItem("favourites")) || [];

    const isAlreadyFavourite = favouritesJokes.includes(joke.id);

    if (!isAlreadyFavourite) {
      favouritesJokes.push(joke.id);
      favourites.value = favouritesJokes;
      localStorage.setItem("favourites", JSON.stringify(favouritesJokes));
    } else {
      console.log("Joke already exists in favourites !!!");
    }
  };

  const removeFromFavourites = (joke) => {
    const favouritesJokes = favourites.value.length
      ? [...favourites.value]
      : JSON.parse(localStorage.getItem("favourites")) || [];

    const jokeId = joke.id;

    const jokeIndex = favouritesJokes.indexOf(jokeId);

    if (jokeIndex !== -1) {
      favouritesJokes.splice(jokeIndex, 1);

      const objectIndex = favouritesObjects.value.findIndex((obj) => obj.id === jokeId);

      if (objectIndex !== -1) {
        favouritesObjects.value.splice(objectIndex, 1);
      } else {
        console.log(`Object with ID ${jokeId} not found in favouritesObjects`);
      }

      favourites.value = favouritesJokes;
      localStorage.setItem("favourites", JSON.stringify(favouritesJokes));
    } else {
      console.log(`Joke with ID ${jokeId} not found in favourites !!!`);
    }
  };





  return {
    currentJoke,
    categories,
    loading,
    favourites,
    error,
    favouritesObjects,
    loadCategories,
    addRandomJoke,
    addJokeByCategory,
    addToFavourites,
    removeFromFavourites,
  };
});

import { ref } from 'vue'
import { defineStore } from 'pinia';
import useFetchChuckNorrisApi from '../utilities/fetchUtils.js';

export const useJokeStore = defineStore('jokeStore', () => {
  const { fetchRandomJoke, fetchRandomJokeByCategory, fetchJokeCategories } = useFetchChuckNorrisApi();

  // State
  const currentJoke = ref(null);
  const categories = ref([]);
  const favourites = ref([]);
  const favouritesObjects = ref([]);

  // Actions
  const loadCategories = async () => {
    try {
      categories.value = await fetchJokeCategories();
    } catch (err) {
      console.log("Error load categories ---", err);
    }
  };

  const addRandomJoke = async () => {
    try {
      const joke = await fetchRandomJoke();
      currentJoke.value = joke;
    } catch (err) {
      console.log("Add random joke error ---", err)
    }
  };

  const addJokeByCategory = async (category) => {
    try {
      const joke = await fetchRandomJokeByCategory(category);
      currentJoke.value = joke;
    } catch (err) {
      console.log("Add joke by category error ---", err);
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
    favourites,
    favouritesObjects,
    loadCategories,
    addRandomJoke,
    addJokeByCategory,
    addToFavourites,
    removeFromFavourites,
  };
}
  // {
  //   persist: {
  //     key: 'jokeStore',
  //     storage: localStorage,
  //     paths: ['currentJoke', 'favourites']
  //   },
);


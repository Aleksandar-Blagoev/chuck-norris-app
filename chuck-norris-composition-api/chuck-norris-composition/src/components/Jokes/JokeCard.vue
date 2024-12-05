<template>
  <div class="card-container">
    <Card
      v-if="isInHome"
      cardClasses="d-flex flex-row home-layout shadow-lg"
      :hasImage="true"
      :imageSrc="currentJokeImage"
      imageAlt="Current Joke Image"
    >
      <template #body>
        <p class="card-text joke-text">
          {{ displayedJokeText }}
        </p>
        <JokeButton />
      </template>
    </Card>

    <Card v-else cardClasses="mt-3 flex-row jokes-layout shadow-lg">
      <template #body>
        <h4 v-if="isFavourite && joke?.categories[0] !== undefined" class="mb-4 fw-bold">
          Category: {{ joke.categories[0] }}
        </h4>
        <p class="mb-0 me-3 joke-text">
          {{ displayedJokeText }}
        </p>
      </template>
      <template #icon v-if="isLorem">
        <i
          class="bi fs-4 cursor-pointer m-2 toggle-icon"
          :class="{
            'bi-star-fill text-warning': isFavourite,
            'bi-star text-primary': !isFavourite
          }"
          @click="toggleFavourite"
          title="Toggle Favourite"
        ></i>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useJokeStore } from "@/stores/jokeStore.js";
import isHomePage from "@/utilities/isInHome.js";
import { IMG_URL } from "@/const/chuckNorrisConstants.js";
import Card from "@/components/Card.vue";
import JokeButton from "@/components/Jokes/JokeButton.vue";

  const props = defineProps({
    joke: {
      type: Object,
      required: false,
    },
  });

  const jokeStore = useJokeStore();
  const imgArray = IMG_URL;

  const displayedJokeText = computed(() => {
    return (
      props.joke?.value ||
      jokeStore.currentJoke?.value ||
      JSON.parse(localStorage.getItem("currentJoke"))?.value ||
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, voluptatum."
    );
  });

  const isLorem = computed(() => {
    const jokeText =
      props.joke?.value ||
      jokeStore.currentJoke?.value ||
      JSON.parse(localStorage.getItem("currentJoke"))?.value;
    return !!jokeText;
  });

  const currentJokeImage = computed(() => {
    const randomIndex = Math.floor(Math.random() * imgArray.length);
    return (
      !jokeStore.currentJoke?.icon_url
        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mKMu0_7_YyHSQPtHhqeQvT_AEEO4E9eiWg&s"
        : imgArray[randomIndex]
    );
  });

  const isFavourite = computed(() => {
    const jokeToCheck =
      props.joke || jokeStore.currentJoke || JSON.parse(localStorage.getItem("currentJoke"));

    const favouritesIds = jokeStore.favourites.length
      ? jokeStore.favourites
      : JSON.parse(localStorage.getItem("favourites")) || [];

    const isFavouriteById = favouritesIds.includes(jokeToCheck?.id);

    const isFavouriteObject = jokeStore.favouritesObjects.some(
      (obj) => obj?.id === jokeToCheck?.id
    );

    if(isFavouriteById && isFavouriteObject) {
      return isFavouriteById && isFavouriteObject
    } else {
      return isFavouriteById
    }
  });

  const isInHome = computed(isHomePage);

  const toggleFavourite = () => {
    const jokeToToggle =
      props.joke || jokeStore.currentJoke || JSON.parse(localStorage.getItem("currentJoke"));
    if (!jokeToToggle) return;

    if (isFavourite.value) {
      jokeStore.removeFromFavourites(jokeToToggle);
    } else {
      jokeStore.addToFavourites(jokeToToggle);
    }
  };
</script>


<style scoped>
@import "@/assets/styles/jokeCard.css";
</style>




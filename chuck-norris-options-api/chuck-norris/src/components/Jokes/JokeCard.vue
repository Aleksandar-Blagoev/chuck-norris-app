<template>
  <!-- Home Page Layout -->
  <Card
    v-if="isInHome"
    cardClasses="d-flex flex-row"
    :hasImage="true"
    :imageSrc="currentJokeImage"
    imageAlt="Current Joke Image"
  >
    <template #body>
      <p class="card-text">
        {{ displayedJokeText }}
      </p>
      <JokeButton />
    </template>
  </Card>

  <!-- Jokes Page Layout -->
  <Card v-else cardClasses="mt-3 flex-row">
    <template #body>
      <p class="mb-0 me-3">
        {{ displayedJokeText }}
      </p>
    </template>
    <template #icon>
      <i
        class="bi fs-4 cursor-pointer m-2"
        :class="{
          'bi-star-fill text-warning': isFavourite,
          'bi-star text-primary': !isFavourite
        }"
        @click="toggleFavourite"
        title="Toggle Favourite"
      ></i>
    </template>
  </Card>
</template>

<script>
import { useJokeStore } from "@/stores/jokeStore.js";
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";
import JokeButton from "@/components/Jokes/JokeButton.vue";

export default {
  components: {
    Card,
    JokeButton,
  },
  name: "JokeCard",
  props: {
    joke: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      jokeStore: useJokeStore(),
      route: useRoute(),
    };
  },
  computed: {
    displayedJokeText() {
      return (
        this.joke?.value ||
        this.jokeStore.currentJoke?.value ||
        JSON.parse(localStorage.getItem("currentJoke"))?.value ||
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, voluptatum."
      );
    },
    currentJokeImage() {
      return (
        this.jokeStore.currentJoke?.icon_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mKMu0_7_YyHSQPtHhqeQvT_AEEO4E9eiWg&s"
      );
    },
    isFavourite() {
      const jokeToCheck = this.joke || this.jokeStore.currentJoke || JSON.parse(localStorage.getItem("currentJoke"));

      const favouritesIds =  this.jokeStore.favourites.length ? this.jokeStore.favourites : JSON.parse(localStorage.getItem("favourites")) || [];

      const isFavouriteById = favouritesIds.includes(jokeToCheck?.id);

      const isFavouriteObject = this.jokeStore.favouritesObjects.some(
        (obj) => obj?.id === jokeToCheck?.id
      );

      if(isFavouriteById && isFavouriteObject) {
        return isFavouriteById && isFavouriteObject
      } else {
        return isFavouriteById
      }
    },
    isInHome() {
      const endPath = this.route.path.split("/").pop().toLowerCase();
      return endPath !== "jokes" && endPath !== "favourites";
    },
  },
  methods: {
    toggleFavourite() {
      const jokeToToggle = this.joke || this.jokeStore.currentJoke || JSON.parse(localStorage.getItem("currentJoke"));
      if (!jokeToToggle) return;

      if (this.isFavourite) {
        this.jokeStore.removeFromFavourites(jokeToToggle);
      } else {
        this.jokeStore.addToFavourites(jokeToToggle);
      }
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>



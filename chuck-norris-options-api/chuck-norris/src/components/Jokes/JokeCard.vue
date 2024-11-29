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

<script>
import { useJokeStore } from "@/stores/jokeStore.js";
import { useRoute } from "vue-router";
import { IMG_URL } from '@/const/chuckNorrisConst.js';
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
    }
  },
  data() {
    return {
      jokeStore: useJokeStore(),
      route: useRoute(),
      imgArray: IMG_URL,
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
    isLorem() {
      const jokeText =
        this.joke?.value ||
        this.jokeStore.currentJoke?.value ||
        JSON.parse(localStorage.getItem("currentJoke"))?.value

      return !!jokeText;
    },
    currentJokeImage() {
      const randomIndex = Math.floor(Math.random() * this.imgArray.length);

      return (
        !this.jokeStore.currentJoke?.icon_url ?  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mKMu0_7_YyHSQPtHhqeQvT_AEEO4E9eiWg&s" : this.imgArray[randomIndex]
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

  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
    width: 500px;
  }

  .card {
    border-radius: 15px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: scale(1.1, 1.1);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .home-layout {
    background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  }

  .jokes-layout {
    background: linear-gradient(145deg, #f1f1f1, #d9d9d9);
    padding: 1rem;
  }

  .joke-text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .toggle-icon {
    transition: transform 0.2s ease;
  }

  .toggle-icon:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
  .card {
    margin-bottom: 1.5rem;
  }

  .home-layout, .jokes-layout {
    flex-direction: column;
  }

  .joke-text {
    text-align: center;
  }

</style>



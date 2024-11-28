<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">

      <div v-if="!avatarIcon">
        <i class="bi bi-person-circle avatar-icon"></i>
      </div>
      <div v-else>
        <img
          :src="avatarIcon"
          alt="User Avatar"
          class="avatar-img"
        />
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <NavbarItem :to="{ path: '/' }" label="Home" />
          <NavbarItem :to="{ path: '/jokes' }" label="Jokes" />
          <NavbarItem :to="{ path: '/favourites' }" label="Favourites" />
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarItem from './NavbarItem.vue';
import { useJokeStore } from "@/stores/jokeStore.js";

export default {
  name: 'Navbar',
  components: {
    NavbarItem,
  },
  data() {
    return {
      jokeStore: useJokeStore(),
    }
  },
  computed: {
    avatarIcon() {
      return this.jokeStore.currentJoke?.icon_url;
    },
  },
};
</script>

<style scoped>
#navbarNav {
  justify-content: center;
}
.avatar-icon {
  font-size: 30px;
  color: #ffffff;
}
.avatar-img {
  width: 45px;
}
</style>


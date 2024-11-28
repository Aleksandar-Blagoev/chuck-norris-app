<template>
  <div id="app">
    <Navbar />
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Nav/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
}
.main-content {
  margin-top: 4rem;
}
body {
  background-color: darkslategray;
}
</style>


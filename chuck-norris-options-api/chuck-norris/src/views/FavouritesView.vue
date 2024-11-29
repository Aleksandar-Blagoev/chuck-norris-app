<template>
  <Favourites class="favourites-content"/>
</template>

<script>
import Favourites from '@/components/Favourites.vue'
export default {
  components: { Favourites },
}
</script>

<style scoped>
  .favourites-content {
    margin-top: 4rem !important;
  }
</style>

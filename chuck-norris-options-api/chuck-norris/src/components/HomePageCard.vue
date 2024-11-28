<template>
  <JokeCard />
</template>

<script>
  import JokeCard from '@/components/Jokes/JokeCard.vue'
  export default {
    name: "CardWithIcon",
    components: {
      JokeCard,
    }
}
</script>

<style scoped>
.card-img-right {
  width: 50%;
  object-fit: cover;
}
</style>

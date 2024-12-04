<template>
  <select class="form-select" aria-label="Default select example" v-model="selectedCategory" @change="saveToLocalStorage">
    <option value="">Open this select menu</option>
    <option v-for="category in categories" :key="category" :value="category" >
      {{ category }}
    </option>
  </select>
</template>

<script>
import { useJokeStore } from '@/stores/jokeStore.js';

export default {
  name: 'JokeDropdown',
  data() {
    return {
      selectedCategory: '',
      jokeStore : useJokeStore(),
    };
  },
  computed: {
    categories() {
      return this.jokeStore.categories;
    },
  },
  beforeMount() {
    this.jokeStore.loadCategories();
  },
  mounted() {
    const savedOption = JSON.parse(localStorage.getItem("selectedOption"));
    if (savedOption) {
      this.selectedCategory = savedOption;
    }
  },
  watch: {
    selectedCategory(newCategory) {
      this.$emit('update:category', newCategory);
    },
  },
  methods: {
    saveToLocalStorage() {
      localStorage.setItem("selectedOption", JSON.stringify(this.selectedCategory));
    },
  },

};
</script>


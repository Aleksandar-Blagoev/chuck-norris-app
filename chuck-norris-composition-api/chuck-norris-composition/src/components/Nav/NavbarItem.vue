<template>
  <li class="nav-item">
    <RouterLink class="nav-link" :to="to">{{ label }}</RouterLink>
  </li>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
      to:{
        type: [String, Object],
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
  });

</script>

<style scoped>
@import "@/assets/styles/navbarItem.css";
</style>

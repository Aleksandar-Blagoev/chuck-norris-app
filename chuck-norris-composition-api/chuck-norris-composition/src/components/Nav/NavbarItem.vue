<template>
  <li class="nav-item">
    <RouterLink class="nav-link" :class="{ active: isActiveLink(to) }" :to="to">{{ label }}</RouterLink>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRoute } from "vue-router";

  const route = useRoute();

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


  const isActiveLink = (to) => {
    return route.path === to.path;
  };

</script>

<style scoped>
@import "@/assets/styles/navbarItem.css";
</style>

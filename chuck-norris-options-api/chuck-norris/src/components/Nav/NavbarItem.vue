<template>
  <li class="nav-item">
    <RouterLink class="nav-link" :class="{ active: isActiveRoute }" :to="to">
      {{ label }}
    </RouterLink>
  </li>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    isActiveRoute() {
      return this.$route.path === this.to.path;
    },
  },
};
</script>

<style scoped>
/* Hover State */
.nav-link:hover {
  color: white;
  border-radius: 5px;
}

.nav-link:focus {
  color: white;
}

.nav-link.active {
  color: white;
  font-weight: bold;
}
</style>

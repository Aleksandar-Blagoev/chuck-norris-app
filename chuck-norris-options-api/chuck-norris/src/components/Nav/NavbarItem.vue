<template>
  <li class="nav-item">
    <RouterLink class="nav-link" :to="to">{{ label }}</RouterLink>
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
};
</script>


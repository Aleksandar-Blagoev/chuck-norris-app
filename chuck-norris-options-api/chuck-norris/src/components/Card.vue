<template>
  <div class="card" :class="cardClasses">
    <!-- Dynamic Body Content -->
    <div class="card-body" :class="bodyClasses">
      <slot name="body"></slot>
    </div>

    <!-- Dynamic Image or Icon -->
    <div v-if="hasImage" class="card-img-container">
      <img class="card-img-right" :src="imageSrc" :alt="imageAlt" />
    </div>
    <div v-else>
      <slot name="icon"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    cardClasses: {
      type: String,
      default: "",
      required: true
    },
    bodyClasses: {
      type: String,
      default: "",
      required: false
    },
    hasImage: {
      type: Boolean,
      default: false,
      required: false
    },
    imageSrc: {
      type: String,
      default: "",
      required: false
    },
    imageAlt: {
      type: String,
      default: "Card Image",
      required: false
    },
  },
};
</script>

<style scoped>
  .card-img-right {
    width: 180px;
    height: 100%;
    object-fit: cover;
  }
</style>

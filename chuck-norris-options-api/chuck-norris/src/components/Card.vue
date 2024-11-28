<template>
  <div class="card" :class="cardClasses" :style="cardStyles">
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
    },
    bodyClasses: {
      type: String,
      default: "",
    },
    cardStyles: {
      type: String,
      default: "",
    },
    hasImage: {
      type: Boolean,
      default: false,
    },
    imageSrc: {
      type: String,
      default: "",
    },
    imageAlt: {
      type: String,
      default: "Card Image",
    },
  },
};
</script>

<style scoped>
.card {
  width: 500px;
}
.card-img-right {
  width: 180px;
  height: 100%;
  object-fit: contain;
}
</style>

<template>
  <section class="pagination">
    <button
      :disabled="!prev"
      @click="$emit('pagination', prev)"
      class="nav-button pagination-left-arrow"
    >
      <ChevronArrow />
    </button>
    <button
      :disabled="!next"
      @click="$emit('pagination', next)"
      class="nav-button"
    >
      <ChevronArrow />
    </button>
  </section>
</template>

<script>
import ChevronArrow from "../../assets/icons/ChevronArrow.vue";
export default {
  components: { ChevronArrow },
  props: ["next", "prev"],
};
</script>

<style scoped>
.pagination {
  display: flex;
  column-gap: 2rem;
}
.nav-button {
  background-color: var(--light-green);
  color: var(--light-bg) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 6rem;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
}
.nav-button:disabled {
  background-color: var(--opaque-green);
  cursor: not-allowed;
  color: var(--light-bg);
}
.pagination-left-arrow svg {
  transform: rotate(180deg);
}
</style>

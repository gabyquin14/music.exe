<template>
  <div class="pagination">
    <button
      :disabled="!prev"
      @click="$emit('pagination', prev)"
      class="pagination-left-arrow"
    >
      <ChevronArrow />
    </button>
    <button :disabled="!next" @click="$emit('pagination', next)">
      <ChevronArrow />
    </button>
  </div>
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
button {
  background-color: #eca7b2;
  color: #f2d2d7b9;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 6rem;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
}
button:disabled {
  background-color: #d5a7af;
  cursor: not-allowed;
}
.pagination-left-arrow svg {
  transform: rotate(180deg);
}
</style>

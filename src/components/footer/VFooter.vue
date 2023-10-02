<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer>Developed with love 💕 Gabriela Quintanilla</footer>
</template>

<style scoped>
footer {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 500;
  background-color: var(--opaque-green);
  color: var(--light-bg);
}

@media screen and (min-width: 500px) {
  footer {
    font-size: 1.6rem;
  }
}
</style>

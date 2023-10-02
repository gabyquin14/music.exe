<template>
  <section>
    <RouterLink :to="{ name: 'home' }">
      <button class="go-back-button">
        <span>Go back</span>
      </button>
    </RouterLink>
    <div class="title-container">
      <h2>404</h2>
      <h3>Page not found</h3>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
  color: var(--opaque-green);
}

.go-back-button {
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  border: solid 0.1rem var(--opaque-green);
  cursor: pointer;
}
.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
}
h2 {
  font-size: 5rem;
}
h3 {
  font-size: 4rem;
}
</style>

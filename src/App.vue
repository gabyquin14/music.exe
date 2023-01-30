<script>
import { RouterView } from "vue-router";
import NavBar from "./components/navbar/NavBar.vue";
import VFooter from "./components/footer/VFooter.vue";

export default {
  components: { NavBar, RouterView, VFooter },
};
</script>

<template>
  <div class="app">
    <NavBar />

    <RouterView v-slot="{ Component }">
      <Transition :name="$route.meta.transition || 'fade'" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>

    <VFooter />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
  width: 100vw;
}
</style>

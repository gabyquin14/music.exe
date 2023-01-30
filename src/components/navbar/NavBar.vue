<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { RouterLink } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
export default {
  components: { RouterLink },
  data() {
    return {
      auth: null,
      isLoggedIn: false,
    };
  },
  mounted() {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = user ? true : false;
    });
  },
  methods: {
    handleLogOut() {
      signOut(this.auth).then(() => {
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>

<template>
  <main>
    <nav>
      <ul>
        <li>Pokemons</li>
        <li><RouterLink :to="{ name: 'home' }">Home</RouterLink></li>
        <li><RouterLink :to="{ name: 'about' }">Favorites</RouterLink></li>
        <li @click="handleLogOut" v-if="isLoggedIn">
          <RouterLink :to="{ name: 'login' }">Log out</RouterLink>
        </li>
      </ul>
    </nav>
  </main>
</template>

<style scoped>
nav {
  width: 100%;
  background-color: #eca7b2;
  color: #6d4a50;
  padding: 1rem 6rem;
  z-index: 3;
  position: fixed;
}
ul {
  list-style: none;
  display: flex;
  align-items: center;
  flex-grow: 1;
  column-gap: 4rem;
  cursor: pointer;
  padding: 0;
}
ul li:first-child {
  flex-grow: 1;
  font-size: 2.5rem;
}
ul li {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
}
ul li a {
  font-size: 2rem;
  text-decoration: none;
  font-weight: 600;
  color: #6d4a50;
}
</style>

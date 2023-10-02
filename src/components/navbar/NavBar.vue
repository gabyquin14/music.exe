<template>
  <main>
    <nav>
      <h1 class="header-title">Pokemons</h1>
      <button
        class="hamburger-menu"
        @click="showMenu = !showMenu"
        role="button"
        :aria-expanded="showMenu"
      >
        <span class="line top-line"></span>
        <span class="line middle-line"></span>
        <span class="line bottom-line"></span>
      </button>
      <ul :class="`nav-links ${showMenu ? 'show-menu' : ''}`">
        <li><RouterLink :to="{ name: 'home' }">Home</RouterLink></li>
        <li><RouterLink :to="{ name: 'about' }">Favorites</RouterLink></li>
        <li
          @click="handleLogOut"
          v-if="isLoggedIn"
          :class="`${isLoggedIn ? 'active' : ''}`"
        >
          <RouterLink :to="{ name: 'login' }">Log out</RouterLink>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script>
// import { RouterLink } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
export default {
  // components: { RouterLink },
  data() {
    return {
      auth: null,
      isLoggedIn: false,
      showMenu: false,
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

<style scoped>
nav {
  width: 100%;
  background-color: var(--opaque-green);
  color: #6d4a50;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.header-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--light-bg);
}

/* HAMBURGER MENU STYLES */
nav .hamburger-menu {
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  outline: none;
  border: none;
  background-color: transparent;
  gap: 0.45rem;
}

.hamburger-menu .line {
  display: block;
  height: 2px;
  width: 100%;
  border-radius: 10px;
  background: var(--light-bg);
}

.hamburger-menu .top-line {
  transform-origin: 0% 0%;
  transition: transform 0.4s ease-in-out;
}

.hamburger-menu .middle-line {
  transition: transform 0.2s ease-in-out;
}

.hamburger-menu .bottom-line {
  transform-origin: 0% 100%;
  transition: transform 0.4s ease-in-out;
}

.nav-links {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  list-style: none;
  position: absolute;
  top: 3rem;
  right: 0;
  padding: 2rem;
  background-color: var(--opaque-green);
  color: var(--light-bg);
  font-size: 1.6rem;
  width: 100%;
  visibility: hidden;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in,
    visibility 0.5s ease;
  opacity: 0;
  transform: translate(0, -0.5rem);
}

.nav-links.show-menu {
  visibility: visible;
  opacity: 1;
  transform: translate(0, 0.8rem);
}

.hamburger-menu[aria-expanded="true"] .top-line {
  transform: rotate(50deg);
}

.hamburger-menu[aria-expanded="true"] .middle-line {
  transform: scaleY(0);
}

.hamburger-menu[aria-expanded="true"] .bottom-line {
  transform: rotate(-50deg);
}

@media screen and (min-width: 500px) {
  nav .hamburger-menu {
    display: none;
  }
  .nav-links {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 3rem;
    position: unset;
    padding: unset;
    visibility: visible;
    opacity: 1;
    transform: unset;
  }
  .nav-links li.active a {
    font-weight: 800;
  }
  @media screen and (min-width: 1000px) {
    nav {
      padding: 2rem 6rem;
    }
  }
}
</style>

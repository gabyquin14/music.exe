<template>
  <div class="search">
    <input
      type="text"
      placeholder="Search for a pokemon"
      v-model="search"
      v-on:keyup.enter="searchPokemon"
    />
    <div class="search-buttons">
      <button @click="searchPokemon">Search</button>
      <button @click="clearSearch">Clear</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    async searchPokemon() {
      if (this.search !== "")
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${this.search.toLowerCase()}/`
          );
          this.$emit("pokemonSearch", response.data);
        } catch (error) {
          this.$router.push("/not-found");
          console.log(error);
        }
    },
    clearSearch() {
      this.$emit("clear");
      this.search = "";
    },
  },
};
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  column-gap: 2rem;
}
.search-buttons {
  display: flex;
  gap: 2rem;
  margin: auto;
}
input {
  outline: none;
  border: none;
  width: 100%;
  min-width: 20rem;
  background-color: transparent;
  border-bottom: 0.3rem solid var(--opaque-green);
  padding-bottom: 0.5rem;
  font-size: 1.6rem;
  color: var(--dark-text);
}
button {
  color: var(--dark-text);
  background-color: transparent;
  border-radius: 1rem;
  border: 0.2rem solid var(--opaque-green);
  padding: 0.5rem 1.5rem;
  font-size: 1.6rem;
  cursor: pointer;
}

@media screen and (min-width: 600px) {
  .search {
    flex-direction: row;
  }
}
</style>

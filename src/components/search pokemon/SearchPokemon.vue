<template>
  <div class="search">
    <input type="text" placeholder="Search for a pokemon" v-model="search" />
    <button @click="searchPokemon">Search</button>
    <button @click="clearSearch">Clear</button>
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
  column-gap: 2rem;
}
input {
  outline: none;
  border: none;
  width: 100%;
  background-color: transparent;
  border-bottom: 0.3rem solid #ed9ca9c1;
  padding-bottom: 0.5rem;
  font-size: 1.6rem;
}
button {
  color: #6d4a50;
  background-color: transparent;
  border-radius: 1rem;
  border: 0.2rem solid #eca7b2;
  padding: 1rem 2rem;
  font-size: 1.6rem;
  cursor: pointer;
}
</style>

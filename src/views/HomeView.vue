<script>
import axios from "axios";
import PokemonCard from "../components/pokemon card/PokemonCard.vue";
import VPagination from "../components/pagination/VPagination.vue";
export default {
  components: { PokemonCard, VPagination },
  data() {
    return {
      pokemons: [],
    };
  },
  async created() {
    await this.fetchPokemon();
  },
  methods: {
    async fetchPokemon() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"
        );
        this.pokemons = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPaginationPokemon(url) {
      try {
        const response = await axios.get(url);
        this.pokemons = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {},
};
</script>

<template>
  <main>
    <VPagination
      @pagination="fetchPaginationPokemon"
      :next="pokemons.next"
      :prev="pokemons.previous"
    />
    <div class="pokemon-display" v-if="pokemons.results">
      <div v-for="pokemon in pokemons.results" :key="pokemon.name">
        <PokemonCard :pokemon="pokemon" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 4rem;
  margin: 4rem auto 0;
  padding: 4rem;
}
.pokemon-display {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 4rem;
  column-gap: 4rem;
}
</style>

<template>
  <section class="about">
    <span v-if="noFavsYet">No favorites yet</span>
    <div class="pokemon-display" v-else>
      <div v-for="pokemon in favPokemons.pokemonInfo" :key="pokemon">
        <PokemonCard :pokemonUrl="pokemon" />
      </div>
    </div>
  </section>
</template>

<script>
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import PokemonCard from "../components/pokemon card/PokemonCard.vue";
import { db, auth } from "@/firestore";
import mixins from "@/helpers/helper.js";
export default {
  components: { PokemonCard },
  mixins: [mixins],
  data() {
    return {
      favPokemons: [],
    };
  },
  async mounted() {
    await this.getFavPokemons();

    const docRef = doc(db, "fav-pokemon", auth.currentUser.uid);
    onSnapshot(docRef, async (doc) => {
      this.snapshots(doc.data());
    });
  },
  methods: {
    async getFavPokemons() {
      const docRef = doc(db, "fav-pokemon", auth.currentUser.uid);
      const querySnapshot = await getDoc(docRef);
      this.favPokemons = querySnapshot.data();
    },
  },
  computed: {
    noFavsYet() {
      return (
        !this.favPokemons.pokemonInfo ||
        !this.favPokemons.pokemonInfo.length > 0
      );
    },
  },
};
</script>

<style scoped>
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10rem;
}
.pokemon-display {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 4rem;
  column-gap: 4rem;
}
span {
  font-size: 4rem;
  color: #6d4a50;
}
</style>

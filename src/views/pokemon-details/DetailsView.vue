<template>
  <section>
    <RouterLink :to="{ name: 'home' }">
      <button class="go-back-button">
        <ChevronArrow />
        <span>Go back</span>
      </button>
    </RouterLink>

    <div class="details" v-if="pokemonDetail">
      <ProfileImage :image="pokemonDetail.sprites.front_default" />
      <div class="details-info">
        <h1>{{ pokemonDetail.name }}</h1>
        <ul>
          <li>
            <h3>Base experience</h3>
            <span>{{ pokemonDetail.base_experience }}</span>
          </li>
          <li>
            <h3>Pokemon Type</h3>
            <span v-for="(types, i) in pokemonDetail.types" :key="i">{{
              types.type.name
            }}</span>
          </li>
          <li>
            <h3>Stats</h3>
            <span v-for="(stats, i) in pokemonDetail.stats" :key="i">
              {{ stats.stat.name }} : {{ stats.base_stat }}
            </span>
          </li>
          <li>
            <h3>Base experience</h3>
            <span v-for="(abilities, i) in pokemonDetail.abilities" :key="i">{{
              abilities.ability.name
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import ProfileImage from "@/components/profile image/ProfileImage.vue";
import ChevronArrow from "@/assets/icons/ChevronArrow.vue";
export default {
  components: { ProfileImage, ChevronArrow },
  props: ["id"],
  data() {
    return {
      pokemonDetail: null,
    };
  },
  async created() {
    this.fetchPokemon();
  },
  methods: {
    async fetchPokemon() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${this.id}`
        );
        this.pokemonDetail = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.go-back-button {
  background-color: transparent;
  color: #ad5b68;
  border: none;
  outline: none;
  display: flex;
  align-items: baseline;
  column-gap: 1rem;
  margin-left: 10%;
  margin-bottom: 3rem;
}
.go-back-button span {
  font-size: 2rem;
  font-weight: 600;
}
.go-back-button svg {
  transform: rotate(180deg);
}
.details {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 6rem;
  background-color: rgba(255, 255, 255, 0.82);
  color: #6d4a50;
  width: 50vw;
  height: 60vh;
  margin: auto;
  padding: 6rem;
}

h1 {
  font-size: 4rem;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 3rem;
}
ul {
  display: grid;
  grid-template: auto 1fr / auto 1fr;
  column-gap: 6rem;
  row-gap: 4rem;
  padding: 0;
}
ul li {
  list-style: none;
  display: flex;
  justify-content: left;
  flex-direction: column;
  align-items: left;
  flex-wrap: wrap;
  flex: 1 1 0px;
  text-transform: capitalize;
}
ul li h3 {
  font-size: 2rem;
  font-weight: 500;
}
ul li span {
  font-size: 1.6rem;
}

@media screen and (max-width: 1400px) {
  .details {
    width: 70vw;
  }
}
@media screen and (max-width: 900px) {
  .details {
    width: 90vw;
    height: 100%;
    flex-direction: column;
    margin: 10rem auto 4rem;
  }
  h1 {
    font-size: 3rem;
    text-align: center;
    margin-top: 2rem;
  }
}
</style>

<template>
  <section class="details-section">
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
              <span class="stat-name">{{ stats.stat.name }}</span> :
              {{ stats.base_stat }}
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
import ProfileImage from "@/components/profileImage/ProfileImage.vue";
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
.details-section {
  margin-bottom: 2rem;
}
.go-back-button {
  background-color: transparent;
  color: var(--opaque-green);
  border: none;
  outline: none;
  display: flex;
  align-items: baseline;
  column-gap: 1rem;
  margin: 2rem auto;
  cursor: pointer;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  column-gap: 6rem;
  background-color: rgba(255, 255, 255, 0.82);
  color: var(--dark-text);
  padding: 6rem;
}

h1 {
  font-size: 4rem;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 3rem;
  text-align: center;
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
  font-weight: 600;
}
ul li span {
  font-size: 1.6rem;
}
ul li .stat-name {
  font-weight: 500;
}

@media screen and (min-width: 600px) {
  .details {
    width: 70vw;
    margin: auto;
  }
}

@media screen and (min-width: 900px) {
  .details {
    flex-direction: row;
  }
}
@media screen and (min-width: 1100px) {
  .details {
    width: 60vw;
  }
}
</style>

<template>
  <RouterLink
    :to="{ name: 'details', params: { id: pokemonId } }"
    @click.prevent="$event.stopPropagation()"
    @click.stop
  >
    <div class="card">
      <div class="card-image-bg">
        <img :src="pokemonInfo?.sprites?.front_default" alt="" />
      </div>
      <div class="card-title">
        <span>{{ pokemonInfo?.name }}</span>
        <StarFilled
          size="26"
          currentColor="#e6b400"
          v-if="isFav"
          @click.stop.prevent="removeFavPokemon"
        />
        <StarOutline
          size="26"
          currentColor="#e6b400"
          v-if="!isFav"
          @click.stop.prevent="setFavPokemon"
        />
      </div>
    </div>
  </RouterLink>
</template>

<script>
import axios from "axios";
import StarFilled from "../../assets/icons/StarFilled.vue";
import StarOutline from "../../assets/icons/StarOutline.vue";
import {
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, auth } from "@/firestore";
import mixins from "@/helpers/helper.js";

export default {
  components: { StarFilled, StarOutline },
  props: ["pokemon", "pokemonUrl"],
  mixins: [mixins],
  data() {
    return {
      pokemonInfo: [],
      isFav: false,
      pokemonId: 0,
      currentFavs: [],
    };
  },
  async created() {
    await this.fetchPokemonInfo();
    this.pokemonId = this.pokemonUrl.split("pokemon/");
    this.pokemonId = this.pokemonId[1].replace("/", "");

    const docRef = doc(db, "fav-pokemon", auth.currentUser.uid);

    onSnapshot(docRef, async (doc) => {
      this.snapshots(doc.data());
    });
  },
  methods: {
    async fetchPokemonInfo() {
      try {
        const response = await axios.get(this.pokemonUrl);
        this.pokemonInfo = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async setFavPokemon() {
      const collection = doc(db, "fav-pokemon", auth.currentUser.uid);

      if (this.currentFavs) {
        await updateDoc(collection, {
          pokemonInfo: arrayUnion(this.pokemonUrl),
        });
      } else {
        await setDoc(collection, {
          pokemonInfo: [this.pokemonUrl],
        });
      }
    },
    removeFavPokemon() {
      this.deleteFavPokemon().then((isFav) => (this.isFav = isFav));
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  width: 25rem;
  height: 25rem;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.card-image-bg {
  background: linear-gradient(
      0deg,
      rgba(255, 0, 149, 0.2),
      rgba(255, 0, 150, 0.2)
    ),
    url("../../assets/images/brick-wall.webp");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem 1rem 0 0;
}
.card-image-bg img {
  transform: scale(1.8);
}
.card-title {
  margin: auto;
  padding: 0 3rem;
  font-size: 2.6rem;
  font-weight: 500;
  color: #6d4a50;
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.card-title svg {
  min-width: 2.6rem;
  min-height: 2.6rem;
}
</style>

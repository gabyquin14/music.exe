import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db, auth } from "@/firestore";

const mixins = {
  methods: {
    async deleteFavPokemon() {
      const collection = doc(db, "fav-pokemon", auth.currentUser.uid);

      await updateDoc(collection, {
        pokemonInfo: arrayRemove(this.pokemonUrl),
      });
      return false;
    },
    snapshots(docs) {
      this.currentFavs = docs;
      this.currentFavs?.pokemonInfo?.map((pokemon) => {
        if (pokemon === this.pokemonUrl) {
          this.isFav = true;
          return;
        }
      });
    },
  },
};

export default mixins;

// Vue.mixin({
//   methods: {
//     async deleteFavPokemon(isFavs) {
//       const collection = doc(db, "fav-pokemon", auth.currentUser.uid);

//       await updateDoc(collection, {
//         pokemonInfo: arrayRemove(this.pokemonUrl),
//       });
//       // this.isFav = false;
//       isFavs = false;
//       return isFavs;
//     },
//   },
// });

// export default {
//   async deleteFavPokemon(isFavs) {
//     const collection = doc(db, "fav-pokemon", auth.currentUser.uid);

//     await updateDoc(collection, {
//       pokemonInfo: arrayRemove(this.pokemonUrl),
//     });
//     // this.isFav = false;
//     isFavs = false;
//     return isFavs;
//   },
// };

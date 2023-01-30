<template>
  <section>
    <form v-if="isLogin" @submit.prevent="register" class="login">
      <h1>Sign in</h1>
      <h3>
        Welcome to my pokemon display✨! <br />
        Please log in to see all pokemons
      </h3>
      <input
        type="text"
        placeholder="Email"
        ref="email"
        required
        v-model="email"
      />
      <input
        type="password"
        placeholder="Password"
        ref="password"
        required
        v-model="password"
      />
      <span>{{ errorMessage }}</span>
      <button>Sign in</button>

      <div class="form-question">
        <span>Already have an account?</span>
        <RouterLink :to="{ name: 'login' }">
          <button>Log in</button>
        </RouterLink>
      </div>
    </form>
  </section>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firestore";
import { doc, setDoc } from "firebase/firestore";
export default {
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
      showCredentials: false,
      errorMessage: "",
    };
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMessage = "Invalid email";
              break;

            case "auth/wrong-password":
              this.errorMessage = "Incorrect Password";
              break;

            case "auth/user-not-found":
              this.errorMessage = "No account with that email was found";
              break;

            default:
              this.errorMessage = "Email or password is incorrect";
              break;
          }
        });
    },
  },
};
</script>

<style scoped>
@import "@/assets/auth.css";
</style>

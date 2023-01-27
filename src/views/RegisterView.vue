<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((data) => {
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              console.log("easdasdrrorr");
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

<template>
  <main>
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
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 2rem;
  border-radius: 1rem;
  width: 30vw;
  height: 50vh;
  color: #6d4a50;
  padding: 4rem;
}
h1 {
  font-size: 5rem;
  margin-bottom: 1rem;
}
h3 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  text-align: center;
}
input {
  outline: none;
  border: none;
  width: 100%;
  border-bottom: 0.2rem solid pink;
  padding-bottom: 0.5rem;

  font-size: 1.6rem;
}
input.active {
  border-bottom: 0.2rem solid rgba(255, 192, 203, 0.758);
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
span {
  font-size: 1.6rem;
}
.form-question {
  display: flex;
  column-gap: 2rem;
  align-items: center;
}
@media screen and (max-width: 1000px) {
  .login {
    width: 65%;
    height: fit-content;
  }
}
</style>

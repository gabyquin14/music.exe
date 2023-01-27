import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import "./assets/main.css";

const firebaseConfig = {
  apiKey: "AIzaSyAHEvmmVDgQcjQTFY3n5shDuKu3DQ3ku5g",
  authDomain: "pokemon-display.firebaseapp.com",
  projectId: "pokemon-display",
  storageBucket: "pokemon-display.appspot.com",
  messagingSenderId: "146256943323",
  appId: "1:146256943323:web:ff0d628288a263f25214fe",
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount("#app");

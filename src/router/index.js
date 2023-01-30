import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FavoritesView from "../views/FavoritesView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import Details from "../views/pokemon-details/DetailsView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        transition: "fade",
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        transition: "fade",
      },
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
        transition: "fade",
      },
    },
    {
      path: "/pokemon-details/:id",
      name: "details",
      component: Details,
      props: true,
      meta: {
        requiresAuth: true,
        transition: "fade",
      },
    },
    {
      path: "/about",
      name: "about",
      component: FavoritesView,
      meta: {
        requiresAuth: true,
        transition: "fade",
      },
    },
    //Not found page
    {
      path: "/:catchAll(.*)",
      name: "notFound",
      component: NotFoundView,
      meta: {
        transition: "fade",
      },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      console.log("you don't have access");
      next("/login");
    }
  } else {
    next();
  }
});
export default router;

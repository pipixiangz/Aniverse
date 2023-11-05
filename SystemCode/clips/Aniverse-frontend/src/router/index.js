import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
  {
    path: "/register",
    name: 'Register',
    component: () => import("../views/Register.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
  {
    path: "/login",
    name: 'Login',
    component: () => import("../views/Login.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
  {
    path: "/detail/:id",
    name: "Details",
    component: () => import("../views/Details.vue"),
    props: true,
    meta: {
      enterClass: "animate__animated animate__fadeInRight",
      leaveClass: "animate__animated animate__fadeOutRight",
    },
  },
  {
    path: "/fav",
    name: "Fav",
    component: () => import("../views/Favorite.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: () => import("../views/Recommend.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
  {
    path: "/unv",
    name: "Unv",
    component: () => import("../views/Aniverse.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
  {
    path: "/aniprofile",
    name: "AniProfile",
    component: () => import("../views/AniProfile.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },

  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

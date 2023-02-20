import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from "vue-router";
import Soundboard from "@/pages/Soundboard.vue";
import Guesser from "@/pages/Guesser.vue";

const Home = { template: "<div>Home</div>" };
const About = { template: "<div>About</div>" };

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/soundboard", component: Soundboard },
  { path: "/guesser", component: Guesser },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const pinia = createPinia();

const app = createApp({});
app.use(router);
app.use(pinia);

app.mount("#app");

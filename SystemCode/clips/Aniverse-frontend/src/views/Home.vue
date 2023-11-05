<script setup>
import { onMounted, ref, nextTick } from "@vue/runtime-core";
import Movies from "../components/Movies.vue";
import Search from "../components/Search.vue";
import IsLoading from "../components/IsLoading.vue";
import { useAnimesStore } from "../store/animes";
const animeStore = useAnimesStore();

//import { useMoviesStore } from "../store/movies";
//const store = useMoviesStore();

// define some reatcive variables using ref function, which used to 
// store data that can trigger updates in teh component when their value change.
const keyword = ref(
  localStorage.getItem("keyword")
    ? localStorage.getItem("keyword")
    : "One Piece"
);
const scrollComponent = ref(null);
const favMovies = ref(
  localStorage.getItem("favMovies")
    ? JSON.parse(localStorage.getItem("favMovies"))
    : []
);
// the total number of pages for movie results based on the total number
// of results
let totalPage = 0;
setTimeout(() => {
  totalPage = Math.ceil(animeStore.totalResults / 10);
}, 1000);

// register a listener to the DOM, which can fetch more movies data
// when user scroll to the bottem of page.
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  animeStore.getAllMovies(keyword.value);
});

const handleScroll = (e) => {
  const element = scrollComponent.value;
  if (element) {
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      animeStore.page++;
      const savedScrollPosition = window.scrollY; // Save the current scroll position
      if (animeStore.page <= totalPage) {
        animeStore.nextPage(animeStore.page).then(() => {
          // Restore the scroll position after the DOM is updated
          nextTick(() => {
            window.scrollTo(0, savedScrollPosition);
          });
        });
      }
    }
  }
};

const movieMethods = ref(null);

</script>

<template>
  <main>
    <Search />
    <article ref="scrollComponent">
      <Movies :movies="animeStore.movies"  />
      <!-- <Movies :movies="animeStore.movies" :fetchRatings="fetchRatings" /> -->
    </article>
    <IsLoading v-if="animeStore.isLoading" />
  </main>
</template >


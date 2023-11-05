<script setup>
import { onMounted, watch , ref, nextTick } from "@vue/runtime-core";
import Movies from "../components/Movies.vue";
import Search from "../components/Search.vue";
import IsLoading from "../components/IsLoading.vue";
import { useRecAnimesStore } from "../store/recommend";


const recAnimesStore = useRecAnimesStore();

//import { useMoviesStore } from "../store/movies";
//const store = useMoviesStore();
// alert("Recommend.vue calling..."); // worked

// define some reatcive variables using ref function, which used to 
// store data that can trigger updates in teh component when their value change.


const scrollComponent = ref(null);
// const favMovies = ref(
//   localStorage.getItem("favMovies")
//     ? JSON.parse(localStorage.getItem("favMovies"))
//     : []
// );
// the total number of pages for movie results based on the total number
// of results
let totalPage = 2;
setTimeout(() => {
  totalPage = Math.ceil(recAnimesStore.totalResults / 10);
}, 1000);
// watch(recAnimesStore, (newValue, oldValue) => {
//   if (newValue.totalResults !== oldValue.totalResults) {
//     totalPage = Math.ceil(newValue.totalResults / 10);
//     console.log("Total Results:", newValue.totalResults);
//     console.log("Calculated Total Pages:", totalPage);
//   }
// });


// register a listener to the DOM, which can fetch more movies data
// when user scroll to the bottem of page.
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  recAnimesStore.getRecAllMovies();
});

const handleScroll = (e) => {
  const element = scrollComponent.value;
  if (element) {
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      recAnimesStore.page++;
      const savedScrollPosition = window.scrollY; // Save the current scroll position
      if (recAnimesStore.page <= totalPage) {
        recAnimesStore.nextPage(recAnimesStore.page).then(() => {
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
      <!-- <Movies :movies="recAnimesStore.movies" :fetchRatings="fetchRatings" /> -->
      <Movies :movies="recAnimesStore.movies" />
    </article>
    <IsLoading v-if="recAnimesStore.isLoading" />
  </main>
</template >


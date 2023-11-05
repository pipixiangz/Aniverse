<script setup>
import Header from "../components/Header.vue";
import Movies from "../components/Movies.vue";
import IsLoading from "../components/IsLoading.vue";
import { watchEffect, ref, onMounted } from "@vue/runtime-core";
import CalendarIcon from "../components/icons/CalendarIcon.vue";
import TimeIcon from "../components/icons/TimeIcon.vue";
import HeartIcon from "../components/icons/HeartIcon.vue";
import LocationIcon from "../components/icons/LocationIcon.vue";
import StarIcon from "../components/icons/StarIcon.vue";
//import { useMoviesStore } from "../store/movies";
import { useFavoritStore } from "../store/favorit";

const favStore = useFavoritStore();
//const moviesStore = useMoviesStore();

import { useAnimesStore } from "../store/animes";
const animeStore = useAnimesStore();
const films = ref([]);
const props = defineProps({
  id: String,
});
// 合并多个 ref 更新，只触发一次渲染
const combinedRef = ref({ isLoading: true, films: [] });
const isFetching = ref(false); // 标志用于防止重复请求
const fetchData = async () => {
  if (isFetching.value) {
    return; // 如果正在请求中，不再发起新的请求
  }
  isFetching.value = true;

  try {
    await animeStore.getRecommendByMovieID(props.id);
    films.value = animeStore.movies;
    animeStore.getMovieByID(props.id);
  } finally {
    isFetching.value = false;
  }
};


watchEffect(() => {
  combinedRef.value.isLoading = isFetching.value || animeStore.isLoading;
  combinedRef.value.films = films.value;
});
onMounted(() => {
  fetchData();
});


// const films = ref([]);

// watchEffect(() => {
//   // films.value = animeStore.movies.filter((movie) => movie.Anime_id != props.id);
//   animeStore.getRecommendByMovieID(props.id);
//   films.value = animeStore.movies;
//   // alert(JSON.stringify(films.value, null, 2)); // 
//   // alert(Object.keys(films.value).length ); // == 9
//   animeStore.getMovieByID(props.id);
// });

// onMounted(() => {
//   animeStore.getRecommendByMovieID(props.id);
//   films.value = animeStore.movies;
//   animeStore.getMovieByID(props.id);

// });

const toggleFav = (id, e) => {
  const cek = favStore.favMovies.filter((movie) => movie.Anime_id == id);
  if (cek.length > 0) {
    favStore.removeFromFav(id);
    e.target.classList.remove("text-red-600");
  } else {
    favStore.addToFavorit(id);
    e.target.classList.add("text-red-600");
  }
};

const handleTextFav = (Anime_id) => {
  const cek = favStore.favMovies.filter((movie) => movie.Anime_id == Anime_id);
  return cek.length ? "Remove from Favorite" : "Add to Favorite";
};

const getClass = (Anime_id) => {
  const cek = favStore.favMovies.filter((movie) => movie.Anime_id == Anime_id);
  return cek.length ? "text-red-600" : "text-gray-300";
};
</script>

<template>
  <main>
    <!-- <IsLoading v-if="animeStore.isLoading" /> -->
    <IsLoading v-if="combinedRef.isLoading" />
    <article class="lg:flex lg:gap-5 lg:justify-between lg:items-center">
      <div class="w-full h-64 rounded-md overflow-hidden md:h-80 lg:w-6/12 lg:h-96">
        <img :src="animeStore.movie.Poster" class="w-full h-full object-cover" :alt="animeStore.movie.Title" />
      </div>
      <div class="my-5 lg:w-5/12 lg:mt-0">
        <p class=" text-gray-400 font-light text-xs  mt-2  tracking-wider  md:text-sm ">
          {{ animeStore.movie.Genre }}
        </p>
        <h3 class="my-8 font-medium text-lg text-gray-200 tracking-wider md:text-2xl">
          {{ animeStore.movie.Title }}
        </h3>
        <div class="flex justify-between items-center flex-wrap gap-2 md:justify-start md:gap-14">
          <div class="flex items-center text-gray-400 font-light text-sm">
            <CalendarIcon />
            {{ animeStore.movie.Aired }}
          </div>

          <div class="flex items-center text-gray-400 font-light text-sm">
            <TimeIcon />
            {{ animeStore.movie.Studio }}
          </div>

          <div class="flex items-center text-gray-400 font-light text-sm">
            <LocationIcon />
            {{ animeStore.movie.Producer }}
          </div>
        </div>
        <div class="flex items-center text-gray-400 font-light text-sm my-8">
          <StarIcon />
          {{ animeStore.movie.Popularity }} Votes
        </div>
        <button @click="toggleFav(animeStore.movie.Anime_id, $event)" class="flex items-center mt-8 cursor-pointer"
          :class="getClass(animeStore.movie.Anime_id)">
          <HeartIcon />

          <span class="text-sm tracking-wide">
            {{ handleTextFav(animeStore.movie.Anime_id) }}
          </span>
        </button>
        <br>
        <p class="text-gray-300 text-justify tracking-wider text-sm font-light md:tracking-widest ">
          {{ animeStore.movie.Synopsis }}
        </p>
      </div>
    </article>
    <hr class="mt-24 mb-16 opacity-10" />
    <div>
      <h3 class="text-gray-300 text-sm md:text-lg">
        You migh also like . . . . .
      </h3>
      <Movies :movies="films" />
    </div>
  </main>
</template>

<style></style>
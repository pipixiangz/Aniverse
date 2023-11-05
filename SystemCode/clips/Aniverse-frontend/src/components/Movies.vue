<script setup>
import { onMounted } from 'vue';
import Movie from "./Movie.vue";
import { useAnimesStore } from "../store/animes"; // Adjust path as needed

// const animesStore = useAnimesStore();
// You can define props inside the <script setup> using `defineProps`
const { movies } = defineProps(['movies']);

// Fetch all movies on component mount
onMounted(() => {
  //animesStore.getAllMovies();
});
</script>

<template>
  <div v-if="!movies || movies.length === 0">Loading...</div>
  <div
    v-else
    class="mt-7 w-full flex flex-wrap justify-between gap-5 md:gap-8 lg:gap-5"
  >
    <div
      class="w-2/5 my-2 md:w-1/4 lg:w-2/12"
      v-for="movie in movies"
      :key="movie.Anime_id"
    >
      <Movie :movie="movie" />
    </div>
  </div>
</template>
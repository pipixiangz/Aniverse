<script setup>
//import { useMoviesStore } from "../store/movies";
//const store = useMoviesStore();
import { useAnimesStore } from "../store/animes";
const store = useAnimesStore();
</script>
<template>
  <div class="mt-5 flex justify-center items-center">
    <h2 class="text-gray-300 animate-pulse">
      {{ store.loadingMessage }} . . .
    </h2>
  </div>
</template>
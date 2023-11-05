<script setup>
import axios from 'axios';
import { onMounted } from "@vue/runtime-core";
import Movies from "../components/Movies.vue";
import IsLoading from "../components/IsLoading.vue";

import { useScoredAnimeStore } from '../store/scoredAnime';// favorit
import { useAnimesStore } from "../store/animes";// movies
import { userInfoStore } from "../store/userInfo";


const scoredAnimeStore = useScoredAnimeStore();// store
const animeStore = useAnimesStore();// moviesStore
const user_info = userInfoStore();

onMounted(async () => {
  try {
    console.log(user_info);
    // const response = await axios.get(`${"http://127.0.0.1:8282"}/nonzero_rating/${user_info.account_id}`);
    const response = await axios.get(`${"http://127.0.0.1:8282"}/rating/nonzero_rating/${sessionStorage.getItem("accountID")}`);
    if (response.data) {
      scoredAnimeStore.setScoredAnimes(response.data);
    }
    
  } catch (error) {
    console.error("Error fetching scored animes:", error);
  }
});

onMounted(async () => {
  if(scoredAnimeStore.scoredAnimes.length < 1){
    animeStore.isLoading = true;
    animeStore.loadingMessage = "Empty";
  }
});

</script>


<template>
  <main>
    <h3 class="text-gray-500 text-xl tracking-widest">Your Scored Animes</h3>
    <!--Movies :movies="scoredAnimeStore.scoredAnimes" /-->
    <Movies :movies="scoredAnimeStore.scoredAnimes" :fetchRatings="fetchRatings" />
    <IsLoading v-if="animeStore.isLoading" />
  </main>
</template>
<template>
  <div class="flex">
    <!-- Loop through hearts and display them -->
    <div v-for="(rate, index) in ratings" :key="index" class="mr-1">
      <button @click="toggleHeart(index)">
        <emptyHeart v-if="rate === 0" />
        <halfHeart v-if="rate === 0.5" />
        <fullHeart v-if="rate === 1" />
      </button>
    </div>

    <!-- Display the total score -->
    <div class="ml-4 text-xl font-bold">{{ totalScore }}</div>
  </div>
</template>



<script setup>
import { ref, reactive, computed, defineProps } from 'vue';
import emptyHeart from './icons/emptyHeart.vue';
import fullHeart from './icons/fullHeart.vue';
import halfHeart from './icons/halfHeart.vue';
import axios from 'axios';
import { userInfoStore } from "../store/userInfo";
//import { useScoreStore } from "../store/score";
import { useScoredAnimeStore } from '../store/scoredAnime.js';

const scoredAnimeStore = useScoredAnimeStore();
const user_info = userInfoStore();

const props = defineProps(['score', 'ratingsFetched', 'unscoredFetched', 'Anime_id', 'account_id']);

function scoreToHeartArray(anime_id = 0, records = []) {
  // First, find if there's a record for this anime_id
  const record = records.find(r => r.anime_id === anime_id);
  let score = record ? record.scores : null;
  if (score == null) {
    score = 0;
    return [0, 0, 0, 0, 0];  // return an array of 0's directly
  } else {
    const heartArray = [];
    const maxHearts = 5;
    let remainingScore = score;

    for (let i = 0; i < maxHearts; i++) {
      if (remainingScore >= 2) {
        heartArray.push(1);
        remainingScore -= 2;
      } else if (remainingScore === 1) {
        heartArray.push(0.5);
        remainingScore = 0;
      } else {
        heartArray.push(0);
      }
    }

    return heartArray;
  }
}

const ratings = ref(scoreToHeartArray(props.Anime_id, user_info.records));

const toggleHeart = (index) => {
  if (ratings.value[index] === 0) {
    // Make all previous hearts full
    for (let i = 0; i < index; i++) {
      ratings.value[i] = 1;
    }
    ratings.value[index] = 0.5; // Make the current heart half-filled
  } else if (ratings.value[index] === 0.5) {
    // Make all previous hearts and the current one full
    for (let i = 0; i <= index; i++) {
      ratings.value[i] = 1;
    }
  } else if (ratings.value[index] === 1) {
    // Make the current heart and all subsequent hearts empty
    for (let i = index; i < ratings.value.length; i++) {
      ratings.value[i] = 0;
    }
  }

  // Always check if the total score after toggling is zero
  const currentTotalScore = ratings.value.reduce((sum, rating) => sum + (rating) * 2, 0);
  if (currentTotalScore === 0) {
    uploadScore(0);
    // If the score is zero, remove the anime from the scoredAnime store
    scoredAnimeStore.removeScoredAnime(props.Anime_id);
  }
};



function uploadScore(score) {
  const upload_score = {
    // account_id: props.account_id,
    account_id: sessionStorage.getItem("accountID"),
    anime_id: props.Anime_id,
    scores: score,
  };

  axios.post(`${"http://127.0.0.1:8282"}/rating/upload_ratings`, upload_score)
    .then(response => {
      console.log('uploading score:',response.data.msg); // Display success message
    })
    .catch(error => {
      console.error('Error uploading score:', error);
    });
}

// Calculate the total score based on the ratings array
const totalScore = computed(() => {
  const total_score = ratings.value.reduce((sum, rating) => sum + (rating)*2, 0);
  uploadScore(total_score);
  scoredAnimeStore.updateScoredAnime(props.Anime_id, total_score);
  
  return total_score;
});


</script>
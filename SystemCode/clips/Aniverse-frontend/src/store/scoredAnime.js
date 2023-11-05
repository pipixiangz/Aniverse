import { reactive } from 'vue';

const state = reactive({
  scoredAnimes: JSON.parse(localStorage.getItem("scoredAnimes")) || [],
});

export function useScoredAnimeStore() {
  return {
    get scoredAnimes() {
      return state.scoredAnimes;
    },
    setScoredAnimes(animes) {
      state.scoredAnimes = animes;
      localStorage.setItem("scoredAnimes", JSON.stringify(state.scoredAnimes));
    },
    updateScoredAnime(anime_id, newScore) {

      if (Array.isArray(state.scoredAnimes)) {
        const anime = state.scoredAnimes.find(a => a.Anime_id === anime_id);
        if (anime) {
          anime.score = newScore; 
          localStorage.setItem("scoredAnimes", JSON.stringify(state.scoredAnimes)); // Update local storage
        } else {
            console.log("Current scored animes:", state.scoredAnimes);
            console.log("Type of anime_id:", typeof anime_id, ", Value:", anime_id);
        }
    } else {
        console.error('state.scoredAnimes is not an array:', state.scoredAnimes);
    }
    
        
      },
    removeScoredAnime(anime_id) {
      const index = state.scoredAnimes.findIndex(a => a.Anime_id === anime_id);
      console.log('index:', index)
      if (index !== -1) {
        state.scoredAnimes.splice(index, 1);
        localStorage.setItem("scoredAnimes", JSON.stringify(state.scoredAnimes)); // Update local storage
      }
    },
    removeZeroScoredAnimes() {
      state.scoredAnimes = state.scoredAnimes.filter(anime => anime.score !== 0);
      localStorage.setItem("scoredAnimes", JSON.stringify(state.scoredAnimes)); // Update local storage
    }
  };
}
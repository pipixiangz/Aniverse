import axios from "axios";
import { defineStore } from "pinia";
import { userInfoStore } from "./userInfo";
const MY_API_URL = "http://127.0.0.1:8282/";
const OMDb_API_URL = "https://www.omdbapi.com/";
const OMDb_API_KEY = "f9bfc5b4";
// alert("recommend.js loading...");

const userInfo = userInfoStore();
// alert("userInfo.username" + userInfo.username);
const posted_username = userInfo.username || 'chenzhw';


export const useRecAnimesStore = defineStore("recmovies", {
  // state function defines the intial state of the movies store
  state: () => {
    return {
      movies: [],
      movie: {},
      isLoading: false,
      totalResults: 0,
      loadingMessage: "Please wait",
      page: 1,
    };

  },

  // actions object defines methods that can be used to interact with and modify
  // the store's state
  actions: {
    async getRecAllMovies() {
      // console.log("getRecAllMovies function is called.");
      this.isLoading = true;
      this.loadingMessage = "Please wait";

      try {
        // alert("Geting All Movies recommended...")
        //alert(posted_username);
        const { data } = await axios.get(`http://127.0.0.1:8282/recommend?username=${posted_username}`);
        // alert("data.totalResults from animes.js" +  data.totalResults + "posted " + posted_username);
        // alert(data);
        // alert(data.totalResults);
        this.totalResults = data.totalResults;

        // if (data.msg && data.msg === "No anime found!") {
        //     throw new Error("No anime found!");
        // }

        this.movies = data.animes; // Replace the existing list of movies
        this.isLoading = false;

      } catch (err) {
        alert(err);
        [this.isLoading, this.loadingMessage] = [true, err.message];
      }
    },

  }

});
/*
async nextPage() {
    
    //this.page += 1;  // Increment the page number
    console.log('next page number:',this.page)

    try {
        this.isLoading = true;
        this.loadingMessage = "Loading next page...";

        const { data } = await axios.get(`http://127.0.0.1:8282/anime?page=${this.page}`);
        
        if (data.msg && data.msg === "No anime found!") {
            throw new Error("No more movies available!");
        }

        this.isLoading = false;
        
        // Append new movies to the existing list
        data.animes.forEach(movie => this.movies.push(movie));

    } catch (error) {
        this.isLoading = false;
        this.errorMessage = error.message;
    }
},*/





import { defineStore } from 'pinia';

export const userInfoStore = defineStore('infor', {
  state: () => ({
    account_id: null,
    username: null,
    password: null,
    anime_id: null,
    scores: null,
    records: [],
    animeIdSet: false, // 标志：anime_id是否已被设定
    scoreSet: false    // 标志：scores是否已被设定
  }),
  actions: {
    setUser(data) {
      this.account_id = data.account_id;
      this.username = data.username;
      this.password = data.password;
      console.log('save success');
    },
    clearUser() {
      this.account_id = null;
      this.username = null;
      this.password = null;
      this.records = [];
    },
    setScore(score) {
      this.scores = score;
      this.scoreSet = true;  // 设置scores标志
      this.syncToRecords();
    },
    setAnime(anime) {
      this.anime_id = anime;
      this.animeIdSet = true;  // 设置anime_id标志
      this.syncToRecords();
    },
    syncToRecords() {
      if(this.animeIdSet && this.scoreSet) {
        // Check if the record with this anime_id already exists
        const existingRecordIndex = this.records.findIndex(record => record.anime_id === this.anime_id);
        
        if (existingRecordIndex > -1) {
          // Update the existing record's score
          this.records[existingRecordIndex].scores = this.scores;
        } else {
          // Create a new record
          const newRecord = {
            anime_id: this.anime_id,
            scores: this.scores
          };
          this.records.push(newRecord);
        }
    
        console.log("record saved:", this.records)
        
        // Reset the flags
        this.animeIdSet = false;
        this.scoreSet = false;
      }
    }
    
  },
});
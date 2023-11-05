<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-5">Profile</h1>

    <!-- Display Current Avatar -->
    <div class="mb-5">
    <div class="bg-gray-300 rounded-full w-64 h-64 overflow-hidden mx-auto">
      <img :src="userAvatar" alt="User Avatar" class="w-full h-full object-cover">
    </div>
  </div>

    

    <!-- Upload New Avatar -->
    <div class="mt-5">
      <label class="cursor-pointer bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600">
        Upload New Avatar
        <input type="file" class="hidden" @change="uploadAvatar">
      </label>
    </div>
  </div>
</template>


<script>
import axios from "axios";

const accountId = sessionStorage.getItem("accountID");

export default {
    name: 'Profile',
    data() {
      return {
          avatarDataURL: sessionStorage.getItem("userAvatar") || 'src/components/icons/default.jpg'
      };
    },
    computed: {
      userAvatar() {
        return this.avatarDataURL;
      }
    },
    mounted() {
        this.fetchAvatarFromBackend();
    },
    methods: {
        async fetchAvatarFromBackend() {
            try {
                const response = await axios.get(`${"http://127.0.0.1:8282"}/get_avatar/${accountId}`);
                if (response && response.data) {
                    this.avatarDataURL = response.data;
                }
            } catch (error) {
                console.error('Error fetching avatar:', error);
            }
        },
        async uploadAvatar(event) {
            const file = event.target.files[0];
            if (file) {
              this.avatarBlob = await this.convertToBlob(file);
              await this.saveToServer(this.avatarBlob);
            }
        },
        convertToBlob(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = event => {
                    resolve(event.target.result);
                };
                reader.onerror = error => {
                    reject(error);
                };
                reader.readAsDataURL(file);
            });
        },
        async saveToServer(blobData) {
            try {
                const formData = new FormData();
                formData.append('avatar', blobData);
                formData.append('user_id', accountId);

                const response = await axios.post(`${"http://127.0.0.1:8282"}/upload_avatar`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status !== 200) {
                    throw new Error('Failed to upload image');
                }
                this.fetchAvatarFromBackend();
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    },
};
</script>
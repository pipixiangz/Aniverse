export default {
    name: 'Profile',
    data() {
      return {
        avatar: null,
        temporaryAvatar: null  // For cropping preview
      };
    },
    computed: {
      userAvatar() {
        return this.avatar ? URL.createObjectURL(this.avatar) : sessionStorage.getItem("userAvatar") || 'src/components/icons/default.jpg';
      },
    },
    methods: {
        async uploadAvatar(event) {
            const file = event.target.files[0];
            if (file) {
              this.avatar = file;
          
              const blobData = await this.convertToBlob(file);
              console.log('blobData', blobData);
              
              // Send blobData to the server to be stored in the database
              await this.saveToServer(blobData);
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
          
      async cropImage() {
        // Get the cropped image data from the cropper component
        const croppedImageBlob = this.$refs.cropper.getCroppedImage();  // This is hypothetical, actual method will vary based on the library you choose
  
        // Save the cropped image for preview
        this.avatar = croppedImageBlob;
  
        // Logic to save the cropped avatar to the server or any other storage
        const uploadedUrl = await this.saveToServer(croppedImageBlob);
        sessionStorage.setItem("userAvatar", uploadedUrl);
      },
      async saveToServer(file) {
        try {
          // Create a FormData object to hold the file
          const formData = new FormData();
          formData.append('avatar', file);
          
          // Modify the URL below to your Flask endpoint
          const response = await axios.get(`${"http://127.0.0.1:8282"}/upload-endpoint`, {
            method: 'POST',
            body: formData,
          });
          console.log('response,', response)


      
          // Check if upload was successful
          if (!response.ok) {
            throw new Error('Failed to upload image');
          }
      
          const data = await response.json();
        
          // If your backend returns the URL of the uploaded image, use it. 
          // Otherwise, you might return a success message or use another approach.
          return data.url || `${"http://127.0.0.1:8282"}/upload-endpoint`; 
      
        } catch (error) {
          console.error('Error uploading image:', error);
          throw error;
        }
      },
      
    },
  };
  
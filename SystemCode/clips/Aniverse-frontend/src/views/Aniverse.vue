
<template>
  <div class="container mt-5 aniverse">
    <h1 class="text-center mb-5 styled-title">Welcome to AniVerse</h1>

    <!-- 文件上传 -->
    <div class="mb-5 text-center">
      <input type="file" id="file-upload" @change="onFileChange" style="display: none;" />
      <label for="file-upload" class="btn btn-primary custom-file-upload">
        {{ buttonText }}
      </label>
    </div>

    <!-- 样式选择按钮 -->
    <div class="styles mb-5 text-center">
      <button @click="applyStyle('style1')" class="btn mx-2 paprika-style-btn">
        Paprika Style
      </button>
      <button @click="applyStyle('style2')" class="btn mx-2 hayao-style-btn">
        Hayao Style
      </button>
      <button @click="applyStyle('style3')" class="btn mx-2 shinkai-style-btn">
        Shinkai Style
      </button>
    </div>

    <!-- 图片展示区域 -->
    <div class="image-preview text-center">
      <div v-if="imageUrl" class="d-inline-block">
        <img :src="imageUrl" alt="Original" class="img-fluid rounded" />
        <div>Original</div>
      </div>

      <div v-if="processedImageUrl" class="d-inline-block">
        <img :src="processedImageUrl" alt="Styled" class="img-fluid rounded" />
        <div>Styled</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      selectedFile: null,
      imageUrl: '',
      buttonText: 'Please Select Your Image',
      processedImageUrl: null,  // 新增：用于存储处理后的图片的URL
      buttonText: 'Please Select Your Image'
    };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      this.buttonText = 'Selected';
      this.selectedFile = files[0];  // 存储文件对象
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;  // 显示原始图片
      };
      reader.readAsDataURL(file);
    },
    applyStyle(styleName) {
      console.log('Applying style:', styleName);

      const formData = new FormData();
      formData.append('style', styleName);
      formData.append('image', this.selectedFile);

      // Alert the content of the FormData
      var formDataString = "";
      for (var pair of formData.entries()) {
        formDataString += pair[0] + ": " + pair[1] + "\n";
      }
      alert(formDataString);

      axios.post('http://localhost:8282/Anyani/upload_image_aniverse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log('Style applied:', response.data);
          // 假设后端返回处理后的图像的文件名
          const filename = response.data.filename;

          // 构造一个URL来访问该文件
          this.processedImageUrl = `http://localhost:8282/content/outputs/${filename}`;
          console.log(this.processedImageUrl);
          console.log(filename)
        })
        .catch(error => {
          console.error('Error applying style:', error);
        });
    },
  },
};
</script>
<style scoped>
@keyframes swing {
  0% {
    transform: rotate(-5deg);
  }

  50% {
    transform: rotate(5deg);
  }

  100% {
    transform: rotate(-5deg);
  }
}

.styled-title {
  background: linear-gradient(90deg, red, rgb(242, 58, 21), rgb(240, 89, 8), green, blue, indigo, violet);
  -webkit-background-clip: text;
  color: transparent;
  /* 浅色文字 */

  text-shadow: 2px 2px 2px #999;
  /* 文字阴影效果 */
  font-family: 'VT323', cursive;
  /* 艺术字体，需要确保用户的设备上有这个字体，或者你可以使用 Google Fonts 或其他字体服务 */
  font-size: 80px;
  /* 调整字体大小 */
  display: inline-block;
  /* 这是为了使 transform 属性有效 */
  animation: swing 1s 5 alternate;
  /* 让动画播放五次 */
  transform-origin: center bottom;
  /* 设置旋转点为文本的底部中心 */
}
</style>

<style scoped>
.styled-title2 {
  color: #ccc;
  /* 浅色文字 */
  text-shadow: 2px 2px 2px #999;
  /* 文字阴影效果 */
  font-family: 'Maven Pro', cursive;
  /* 艺术字体，需要确保用户的设备上有这个字体，或者你可以使用 Google Fonts 或其他字体服务 */
  font-size: 22px;
  /* 调整字体大小 */
}
</style>

<style scoped>
.aniverse {
  max-width: 800px;
  margin: auto;
}

.image-preview img {
  max-height: 500px;
  border: 1px solid #ddd;
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

<style scoped>
.custom-file-upload {
  background-color: #000000;
  /* 你可以设置为你希望的任何颜色 */
  color: rgb(193, 193, 193);
  /* 根据背景颜色更改文字颜色以确保可读性 */
  border: none;
  /* 可选：移除边框 */
  transition: background-color 0.3s ease;
  /* 可选：添加过渡效果 */
}

.custom-file-upload:hover {
  background-color: #ee2fe5;
  /* 可选：更改鼠标悬停时的背景颜色 */
}
</style>
<style scoped>
.paprika-style-btn {
  background-color: #00d03e;
  /* Paprika Style 按钮的背景颜色 */
  color: white;
  /* 文字颜色 */
}

.hayao-style-btn {
  background-color: #c50606;
  /* Hayao Style 按钮的背景颜色 */
  color: white;
  /* 文字颜色 */
}

.shinkai-style-btn {
  background-color: #0707dd;
  /* Shinkai Style 按钮的背景颜色 */
  color: white;
  /* 文字颜色 */
}

/* 你也可以为按钮添加悬停效果 */
.paprika-style-btn:hover,
.hayao-style-btn:hover,
.shinkai-style-btn:hover {
  opacity: 0.9;
  /* 或者改变其他样式，如背景颜色等 */
}
</style>

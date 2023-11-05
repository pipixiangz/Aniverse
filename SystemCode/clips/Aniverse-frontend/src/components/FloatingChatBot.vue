
<template>
    <div class="chatbot-container" v-if="showIcon" @click="toggleChatbot">
      <!-- SVG 或图像可以放在这里表示 chatbot 的图标 -->
      <img src="../assets/chatbot-icon.svg" alt="Chatbot Icon" />
    </div>

    <div v-if="showDialog" :class="{'chatbot-dialog': true, 'maximized': isMaximized}" @click="showIcon">
      
      <div class="chatbot-header">
        <h4>Chatbot Assistant</h4>
        <button @click="toggleSize" class="size-toggle">+</button> <!-- 这是放大图标 -->
        <button @click="closeDialog">X</button>
        
      </div>
  
      <div class="chatbot-messages" ref="messages">
      <div class="bubble">
        <div v-for="message in messages" :key="message.id" class="message" :class="message.sender">
      <div class="bubble">
      <span>{{ message.text }}</span>
    </div>
  </div>

      </div>
    </div>
  
      <div class="chatbot-input">
        <input type="text" v-model="inputMessage" @keyup.enter="sendMessage" />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script>
import axios from "axios";


  export default {
    data() {
      return {
        showIcon: true,
        showChatbot: false,
        showDialog: false,
        inputMessage: '',
        isMaximized: false, // 用于跟踪对话框是否被放大
        messages: [
          { id: 1, text: 'Hello! How can I assist you today?', sender: 'chatbot' },
          // Add more messages as needed
        ],

      };
    },
    watch: {
    messages() {
      this.$nextTick(() => {
        const container = this.$refs.messages;
        container.scrollTop = container.scrollHeight;
      });
    },
  },
    methods: {
      toggleChatbot() {
        this.showIcon = !this.showIcon;
        this.showChatbot = !this.showChatbot;
        this.showDialog = true;
      },
      toggleSize() {
      this.isMaximized = !this.isMaximized; // 切换放大/缩小状态
      },
      showChatbot() {
        this.showChatbot = true;
      },
      showIcon() {
        this.showIcon = true;
      },
      closeDialog() {
        this.showDialog = false;
        this.showChatbot = true;
        this.showIcon = true;
      },
      sendMessage() {
      if (this.inputMessage.trim() !== '') {
        this.messages.push({
          id: this.messages.length + 1,
          text: this.inputMessage,
          sender: 'user',
        });

        // 添加一个聊天机器人的加载消息
        const loadingMessage = {
          id: this.messages.length + 1,
          text: '...',
          sender: 'chatbot',
          loading: true,
        };
        //this.messages.push(loadingMessage);

        this.sendToServer(this.inputMessage, loadingMessage);  
        this.inputMessage = '';
      }
    },
      async sendToServer(message, loadingMessage) {
      try {
        
        const response = await axios.post(`${"http://127.0.0.1:8282"}/chatbot`, {
          userMessage: message
        });

        // 你可以在这里添加处理服务器响应的代码，例如添加 chatbot 的回复到 messages 数组
        if (response.data.botReply) {
            this.messages.push({
                id: this.messages.length + 1,
                text: response.data.botReply,
                sender: 'chatbot',
            });
        }
        // 移除加载消息
        this.messages = this.messages.filter(msg => msg !== loadingMessage);
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
    },
  };
  </script>
  
  <style scoped>
  .chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    cursor: pointer;
  }
  
  /* .chatbot-dialog {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    width: 300px;
    height: 500px;
    background-color: rgb(190, 190, 190);
    border: 1px solid black;
    border-radius: 10px;
  } */

  .chatbot-dialog {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: rgb(183, 183, 183);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .chatbot-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #eee;
    border-bottom: 1px solid #ccc;
  }
  
  .chatbot-messages {
    flex-grow: 1;
    padding: 10px;
    overflow-y: scroll;
  }
  
  .message.chatbot {
    color: blue;
  }
  
  .message.user {
    display: flex;
    justify-content: flex-end;
    padding-right: 0; 
}
  .chatbot-dialog.maximized .message.user {
  justify-content:right;  /* 当对话框最大化时，将消息居中显示 */
  }
  .chatbot-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
    background-color: #eee;
  }
  
  input[type='text'] {
    flex-grow: 1;
    margin-right: 10px;
    padding: 5px;
  }
  .loading img {
  width: 30px;
  height: auto;
}
.message {
  padding: 8px;
}

.bubble {
  display: inline-block;
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 90%; /* 避免消息太长 */
  position: relative;
}

.message.chatbot .bubble {
  background-color: #e6e5eb; /* 聊天机器人的消息背景色 */
  border-top-left-radius: 1px;
  color: #333;
}

.message.user .bubble {
    background-color: #007AFF; /* 用户的消息背景色 */
    border-top-right-radius: 1px;
    /* margin-right: 2px;  这是为了让气泡有一些距离 */
    color: white;
    text-align: left;
}

/* 对话气泡的尾巴 */
.message.chatbot .bubble::before {
  content: "";
  width: 10px;
  height: 22px;
  background-color: #e6e5eb;
  position: absolute;
  top: 0;
  left: -4px;
  transform: rotate(-27deg);
  clip-path: polygon(0 0, 100% 0%, 0% 100%);
}

.message.user .bubble::before {
  content: "";
  width: 10px;
  height: 19px;
  background-color: #007AFF;
  position: absolute;
  top: 0;
  right: -5px;
  transform: rotate(27deg);
  clip-path: polygon(100% 0, 100% 100%, 0% 100%);
}

.chatbot-header button {
  background-color: red;
  color: white; 
  border: none; 
  border-radius: 50%; 
  width: 20px;
  height: 20px; 
  font-size: 14px; 
  line-height: 18px; 
  text-align: center;
  cursor: pointer;
}

.chatbot-header button:hover {
  background-color: darkred; /* 鼠标悬停时颜色变深 */
}
/* 放大/缩小按钮的样式 */
.chatbot-header .size-toggle {
  background-color: #00af37;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  margin-right: 1px;
  cursor: pointer;
}

.chatbot-header .size-toggle:hover {
  background-color: #00532e;
}

/* 对话框的最大化样式 */
.chatbot-dialog.maximized {
  width: 600px; /* 你可以根据需要设置其他尺寸 */
  height: 800px;
  bottom: 10px;
  right: 10px;
}

  </style>
  
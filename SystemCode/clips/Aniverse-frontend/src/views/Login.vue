<template>
  <div class="register">
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your username"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div class="form-actions">
          <button type="submit">Login</button>
        </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import axios from "axios";
import { defineStore } from 'pinia';
import { userInfoStore } from "../store/userInfo";

const user_info = userInfoStore();

//const accountStore = useAccountStore();
const username = ref(localStorage.getItem("username") ?? "");
const password = ref(localStorage.getItem("password") ?? "");
const router = useRouter();

const loginUser = async () => {
  if (!username.value || !password.value) {
    // Perform client-side validation of the form
    // You can add more validation as needed
    return;
  }
  try {
    // Send a POST request to your Flask backend for user registration
    const response = await (async() => {
      return axios.post(`${"http://127.0.0.1:8282"}/login`, {
        username: username.value,
        password: password.value,
      });
    })();
    // console.log(response.data.msg)
    if (response.data.msg === "success") {
      // 存储登录状态到sessionStorage
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", response.data['username']);
      // Store the account_id into the sessionStorage
      console.log(response.data);
      // 存储用户的account_id
      router.push("/");
      // Store the user info in the store
      user_info.setUser(response.data);
      console.log(user_info.account_id);
      sessionStorage.setItem("accountID", user_info.account_id);

    } else {
      console.error("Login failed:", response.data.error)
    }
  } catch (error) {
    // Handle network errors or other exceptions here
    console.error("Login failed:", error);
  }
};




</script>

  
<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #0056b3;
}
</style>
<template>
  <div class="register">
    <h1>Create an Account</h1>
    <form @submit.prevent="registerUser">
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
        <label for="email">Email Address</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
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
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="Confirm your password"
          required
        />
      </div>
      <div class="form-actions">
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import axios from "axios";

const username = ref(localStorage.getItem("username") ?? "deng hewen");
const email = ref(localStorage.getItem("email") ?? "denghewen@abc.com");
const password = ref(localStorage.getItem("password") ?? "123456");
const confirmPassword = ref(localStorage.getItem("confirmPassword") ?? "123456");
const router = useRouter();

const registerUser = async() => {
  if (
      !username.value ||
      !email.value ||
      !password.value ||
      password.value !== confirmPassword.value
  ) {
      // Perform client-side validation of the form
      // You can add more validation as needed
      return;
  }
  try {
      // Send a POST request to your Flask backend for user registration
      const response = await (async() => {
          return axios.post(`${"http://127.0.0.1:8282"}/register`, {
            username: username.value,
            email: email.value,
            password: password.value,
          });
      })();
      if (response.data.msg === "success") {
          router.push("/login");
      } else {
        console.error("Registration failed:", response.data.error);
      }
  } catch (error) {
      // Handle network errors or other exceptions here
      console.error("Registration failed:", error);
  }
  // router.push("/login");
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

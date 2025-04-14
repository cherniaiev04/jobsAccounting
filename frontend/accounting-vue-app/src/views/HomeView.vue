<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center">Login</h2>
        <form @submit.prevent="handleLogin" class="mt-4">
          <div>
            <label class="block text-black">Username</label>
            <input
              type="username"
              v-model="username"
              class="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div class="mt-4">
            <label class="block text-black">Password</label>
            <input
              type="password"
              v-model="password"
              class="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label class="block text-black">Device Info</label>
            <input
              type="text"
              v-model="deviceInfo"
              class="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import authService from '../services/authService';
  import axios from 'axios';
  import apiClient from '../services/api';

  export default {
    data() {
      return {
        username: '',
        password: '',
        deviceInfo: '',
        errorMessage: ''
      };
    },
    methods: {
    async handleLogin() {
      try {
        await apiClient.post('/auth/login', {
          username: this.username,
          password: this.password,
          deviceInfo: this.deviceInfo
        });

        this.$router.push('/dashboard');
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Login failed';
      }
    }
  }
  };
  </script>
  
<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center">Login</h2>
        <form @submit.prevent="handleLogin" class="mt-4">
          <div>
            <label class="block text-gray-700">Email</label>
            <input
              type="email"
              v-model="email"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div class="mt-4">
            <label class="block text-gray-700">Password</label>
            <input
              type="password"
              v-model="password"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async handleLogin() {
        try {
          await authService.login({ email: this.email, password: this.password });
          this.$router.push('/dashboard'); // Redirect after login
        } catch (error) {
          this.errorMessage = 'error';
        }
      }
    }
  };
  </script>
  
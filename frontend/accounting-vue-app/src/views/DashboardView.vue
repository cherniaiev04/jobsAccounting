<template>
    <div class="p-10">
      <h1 class="text-3xl font-bold">Dashboard (Protected)</h1>
      <button @click="logout" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  </template>
  
  <script>
  import authService from '../services/authService';
  
  export default {
    async mounted() {
      try {
        await authService.getUser();
      } catch (error) {
        this.$router.push('/login');
      }
    },
    methods: {
      async logout() {
        await authService.logout();
        this.$router.push('/login');
      }
    }
  };
  </script>
  
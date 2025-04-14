<template>
  <div>
    <nav class="p-4 bg-gray-100 flex justify-between">
      <router-link to="/" class="mr-4">Home</router-link>
      <router-link to="/login" class="mr-4">Login</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>
    <router-view />
  </div>
</template>

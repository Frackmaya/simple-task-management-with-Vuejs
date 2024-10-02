<template>
  <div id="app">
    <nav>
      <button @click="logout" v-if="isAuthenticated">Logout</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      return localStorage.getItem('authToken');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
nav {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
button {
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
}
</style>

<template>
  <div class="container">
    <div class="form-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" placeholder="Username" required />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p class="switch-auth">Don't you have an account? <a href="/register">Register</a></p>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:4444/auth/login', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('authToken', response.data.token);
        this.$router.push('/');
      } catch (error) {
        this.error = error.response.data.message || 'Login failed';
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}

.form-container {
  background: white;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}

.switch-auth {
  margin-top: 15px;
}

.switch-auth a {
  color: #007BFF;
  text-decoration: none;
}

.switch-auth a:hover {
  text-decoration: underline;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>

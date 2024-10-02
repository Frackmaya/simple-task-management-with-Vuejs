<template>
  <div class="container">
    <div class="form-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <button type="submit">Register</button>
        <p class="switch-auth">Do you have an account? <a href="/login">Login</a></p>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
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
      email: '',
      error: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:4444/auth/register', {
          username: this.username,
          password: this.password,
          email: this.email
        });
        this.$router.push('/login');
      } catch (error) {
        console.error('Registration error:', error);
        this.error = error.response.data.message || 'Registration failed';
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

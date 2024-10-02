import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '../components/TodoList.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes = [
  { path: '/', component: TodoList },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

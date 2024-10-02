import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Navigation guard
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

createApp(App).use(router).mount('#app');

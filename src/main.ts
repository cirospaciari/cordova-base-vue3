import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes';

import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';


const app  = createApp(App);
app.use(createPinia());


const router = createRouter({
  history: createWebHistory(),
  routes
});

app.use(router);
app.mount('#app');

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import 'normalize.css';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';
import './style.css';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app');

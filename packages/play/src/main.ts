import { createApp } from 'vue';
import App from './App.vue';
import { setupLocal } from './locales';
import { setupRouter } from './router';
import { setupStore } from './store';
import './style/index.less';

function bootstrap() {
  const app = createApp(App);

  setupLocal(app);
  setupStore(app);
  setupRouter(app);

  app.mount('#app');
}

bootstrap();


import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupLocal } from './locales'
import './style/index.less'

const bootstrap = () => {
    const app = createApp(App);

    setupLocal(app)
    setupStore(app);
    setupRouter(app);
    
    
    app.mount('#app')
}



bootstrap()


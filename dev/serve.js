import { createApp } from 'vue';
import Dev from './serve.vue';
import '@/tailwind.css'

const app = createApp(Dev);
app.mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import ImageToPdfConverter from './components/ImageToPdfConverter.vue';

createApp(App).component('ImageToPdfConverter', ImageToPdfConverter).mount('#app');

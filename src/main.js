import * as Vue from 'vue';
import App from './App.vue';

import './assets/main.css';

const app = Vue.createApp(App);
window.Vue = app;
app.component('Login')
app.mount('#app')

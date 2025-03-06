import './assets/pico.yellow.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import { loadFiles } from './ts/fileDistributions'

loadFiles()
createApp(App).mount('#app')

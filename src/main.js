import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router)    // Kích hoạt Vue Router để quản lý các route trong ứng dụng
app.mount('#app')

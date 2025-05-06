import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Kakao SDK 초기화
if (window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY); // .env에 반드시 설정돼 있어야 함
  console.log("Kakao SDK 초기화 완료");
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

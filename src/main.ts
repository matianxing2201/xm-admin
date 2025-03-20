import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { getPlatformConfig } from "./config";

const app = createApp(App);

getPlatformConfig(app).then(config => {
  console.log(config);
  app.use(router);
  app.mount("#app");
});

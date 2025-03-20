import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { getPlatformConfig } from "./config";

const app = createApp(App);

getPlatformConfig(app).then(config => {
  console.log(config);

  app.mount("#app");
});

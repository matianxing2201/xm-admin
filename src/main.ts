import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import { getPlatformConfig } from "./config";

// 引入重置样式
import "./style/reset.scss";
import "./style/index.scss";
import "./style/tailwind.css";
import "element-plus/dist/index.css";

const app = createApp(App);

getPlatformConfig(app).then(config => {
  console.log(config);

  app.use(createPinia());
  app.use(router);
  app.use(ElementPlus);
  app.mount("#app");
});

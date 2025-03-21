import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import { getPlatformConfig } from "./config";
import { injectResponsiveStorage } from "@/utils/responsive";

// 引入重置样式
import "./style/reset.scss";
import "./style/index.scss";
import "./style/tailwind.css";
import "element-plus/dist/index.css";

const app = createApp(App);

getPlatformConfig(app).then(async config => {
  app.use(createPinia());
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config); // 注入响应式存储
  app.use(ElementPlus);
  app.mount("#app");
});

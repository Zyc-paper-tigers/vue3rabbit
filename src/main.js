import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//引入默认样式文件
import "@/styles/common.scss";
// 引入懒加载插件
import { lazyPlugin } from "./directives/index.js";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// 注册懒加载插件
app.use(lazyPlugin);

app.mount("#app");

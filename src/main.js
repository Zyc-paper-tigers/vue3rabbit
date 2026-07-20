import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//引入默认样式文件
import "@/styles/common.scss";
import { useIntersectionObserver } from "@vueuse/core";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

// 全局自定义指令
app.directive("img-lazy", {
  mounted(el, binding) {
    // el   绑定的哪个元素
    // binding  binding.value指令中的内容,在当前情境中就是图片的地址
    // console.log(el, binding.value);
    useIntersectionObserver(el, ([entry]) => {
      // console.log(entry); // entry.isIntersecting 是否进入可视区域
      if (entry.isIntersecting) {
        // 进入视口
        el.src = binding.value;
      }
    });
  },
});

//添加路由实例
// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  // 这里我们采取路由懒加载的方法，当路由被访问时，才会加载对应的组件，可以显著提高用户体验
  routes: [
    {
      path: "/",
      component: () => import("@/views/Layout/index.vue"),
      children: [
        //由于一打开是主页面，所以/ 表示主页面
        {
          path: "",
          component: () => import("@/views/Home/index.vue"),
        },
        {
          path: "category/:id",
          component: () => import("@/views/Category/index.vue"),
        },
      ],
    },
    { path: "/login", component: () => import("@/views/Login/index.vue") },
  ],
});

export default router;

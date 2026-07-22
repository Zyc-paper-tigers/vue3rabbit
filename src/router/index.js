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
        //点击导航栏的“分类”时，跳转到分类页面
        {
          path: "category/:id",
          component: () => import("@/views/Category/index.vue"),
        },
        //点击分类页面中的“子分类”时，跳转到子分类页面
        {
          path: "category/sub/:id",
          component: () => import("@/views/subCategory/index.vue"),
        },
        // 点击商品卡片，跳转到商品详情页
        {
          path: "detail/:id",
          component: () => import("@/views/Detail/index.vue"),
        },
        {
          path: "cartlist",
          component: () => import("@/views/CartList/index.vue"),
        },
        {
          path: "checkout",
          component: () => import("@/views/Checkout/index.vue"),
        },
        {
          path: "pay",
          component: () => import("@/views/Pay/index.vue"),
        },
        {
          path: "paycallback",
          component: () => import("@/views/Pay/PayBack.vue"),
        },
        {
          path: "member",
          component: () => import("@/views/Member/index.vue"),
          children: [
            {
              path: "userinfo",
              component: () => import("@/views/Member/components/UserInfo.vue"),
            },
            {
              path: "userorder",
              component: () => import("@/views/Member/components/UserOrder.vue"),
            },
          ],
        },
      ],
    },
    { path: "/login", component: () => import("@/views/Login/index.vue") },
  ],

  //路由跳转时，页面滚动到顶部
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;

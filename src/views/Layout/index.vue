<script setup>
import { onMounted } from "vue";
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";

//这是在vue3中使用pinia的方式，useCategoryStore是我们在stores/category.js中定义的一个函数，返回一个store实例
import { useCategoryStore } from "@/stores/category.js";
const categoryStore = useCategoryStore();

onMounted(() => {
  // 要使用内部的方法要return出来
  categoryStore.getCategory();
});
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>

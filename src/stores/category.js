import { ref } from "vue";
import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/layout.js";

export const useCategoryStore = defineStore("category", () => {
  //分类数据的存储位置
  const categoryList = ref([]);

  //使用getCategoryAPI函数获取分类数据，并将该操作封装在getCategory中
  const getCategory = async () => {
    const res = await getCategoryAPI();
    categoryList.value = res.data.result;
  };

  return {
    categoryList,
    getCategory,
  };
});

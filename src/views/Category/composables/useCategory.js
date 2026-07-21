import { getCategoryAPI } from "@/apis/category.js";
import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { onMounted } from "vue";

export function useCategory() {
  const categoryData = ref({});
  const route = useRoute();

  // id = route.params.id  如果有数据传过来，就使用传过来的，如果没有就使用默认值route.params.id
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id);
    console.log(res);
    categoryData.value = res.data.result;
  };

  onMounted(() => {
    getCategory();
  });

  // 解决路由缓存问题：当路由参数发生变化的时候，重新发送getCategory请求
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id);
  });

  return {
    categoryData,
  };
}

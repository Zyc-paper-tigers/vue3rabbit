import { ref } from "vue";
import { onMounted } from "vue";
import { getBannerAPI } from "@/apis/home.js";

//封装获取轮播图数据的函数
export function useBanner() {
  const bannerList = ref([]);

  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: "2",
    });
    // console.log(res);
    bannerList.value = res.result;
  };

  onMounted(() => {
    getBanner();
  });

  //外部还需要调用bannerList，return出去
  return {
    bannerList,
  };
}

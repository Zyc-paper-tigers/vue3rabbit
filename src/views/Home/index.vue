<script setup>
import HomeCategory from "./components/HomeCategory.vue";
import HomeBanner from "./components/HomeBanner.vue";
import HomeNew from "./components/HomeNew.vue";
import HomeHot from "./components/HomeHot.vue";
import HomeProduct from "./components/HomeProduct.vue";
import HomePanel from "./components/HomePanel.vue";
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />

  <!-- 在父组件使用的插槽中定义相应的属性名，即可将值传到子组件的props中 -->
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
    <div>我是插槽内容</div>
  </HomePanel>
  <HomePanel title="人气推荐" subTitle="人气爆款 品质靠谱">
    <div>我是插槽内容</div>
  </HomePanel>
</template>

<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category.js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import GoodsItem from "@/views/Home/components/GoodsItem.vue";

//获取面包屑导航数据
const route = useRoute();
const categoryData = ref([]);
const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id);
  categoryData.value = res.result;
};

onMounted(() => {
  getCategoryData();
});

// 获取基础列表数据并渲染
const goodList = ref([]);
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime",
});
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value);
  // console.log(res);
  goodList.value = res.result.items;
};

onMounted(() => {
  getGoodList();
});

const tabChange = () => {
  // 成功触发
  // console.log(reqData.value.sortField);
  reqData.value.page = 1;
  finished.value = false;
  getGoodList();
};

// el-scrollbar 在滚动到底部时触发加载，替代即将弃用的 v-infinite-scroll 指令
const loading = ref(false);
const finished = ref(false);
const load = async () => {
  if (loading.value || finished.value) return;

  loading.value = true;
  try {
    // 获取下一页的数据
    reqData.value.page++;
    const res = await getSubCategoryAPI(reqData.value);
    const items = res.result.items;
    // 拼接
    goodList.value = [...goodList.value, ...items];
    // 加载完毕，停止继续请求
    if (items.length === 0) {
      finished.value = true;
    }
  } finally {
    loading.value = false;
  }
};

const handleEndReached = (direction) => {
  if (direction === "bottom") load();
};
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '`/catagory/${categoryData.parentId}`' }">{{
          categoryData.parentName
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <el-scrollbar class="goods-scrollbar" max-height="70vh" :distance="100" @end-reached="handleEndReached">
        <div class="body">
          <!-- 商品列表-->
          <GoodsItem v-for="item in goodList" :key="item.id" :goods="item" />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-scrollbar {
    margin: 0 -10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>

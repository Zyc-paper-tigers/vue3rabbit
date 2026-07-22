// 封装购物车模块

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    // 判断是否拿到了token，拿到了是true否则为false
    const isLogin = computed(() => userStore.userInfo.token);
    // 1. 定义state - cartList
    const cartList = ref([]);

    // 4. 定义action，获取最新购物车列表
    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };

    // 2. 定义action - addCart添加商品至购物车
    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        // 调用接口
        await insertCartAPI({ skuId, count });
        updateNewList();
      } else {
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
          // 找到了
          item.count++;
        } else {
          // 没找到
          cartList.value.push(goods);
        }
      }
      // 添加购物车操作
      // 已添加过 - count + 1
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    };

    // 3. 定义action， 删除购物车内的商品
    // 删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        await delCartAPI([skuId]);
        updateNewList;
      } else {
        //未登录时操作删除购物车的逻辑
        // 思路：
        // 1. 找到要删除项的下标值 - splice
        const idx = cartList.value.findIndex((item) => skuId === item.skuId);
        cartList.value.splice(idx, 1);
        // 2. 使用数组的过滤方法 - filter
      }
    };

    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    // 计算属性
    // 1. 总的数量 所有项的count之和
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0));

    // 2. 总价 所有项的count*price之和
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0));

    // 是否全选
    const isAll = computed(() => {
      return cartList.value.every((item) => item.selected);
    });

    // 全选功能的action函数
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected));
    };

    // 3. 已选择数量
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0),
    );
    // 4. 已选择商品价钱合计
    const selectedPrice = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0),
    );

    return {
      selectedCount,
      selectedPrice,
      allCount,
      allPrice,
      delCart,
      cartList,
      addCart,
      singleCheck,
      isAll,
      allCheck,
    };
  },
  {
    // 本地持久化，页面刷新后不丢失
    persist: true,
  },
);

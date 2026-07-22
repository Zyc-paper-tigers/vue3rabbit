import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useUserStore } from "@/stores/userStore";
import router from "@/router/index";

const httpInstance = axios.create({
  //接口基地址，方便不同接口调用
  baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net",
  //请求超时时间，超过这个5s就报错
  timeout: 20000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    // 1. 从pinia获取token数据
    const userStore = useUserStore();
    // 2. 按照后端的要求拼接token数据
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e),
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();
    // 统一错误提示
    ElMessage({
      type: "warning",
      message: e.response.data.message,
    });
    // 401失效处理
    if (e.response.status === 401) {
      // 1. 清除用户信息
      userStore.clearUserInfo();
      // 2. 跳转到登录页
      router.replace("/login");
    }
    return Promise.reject(e);
  },
);

//用httpInstance接收之后要暴露出来
export default httpInstance;

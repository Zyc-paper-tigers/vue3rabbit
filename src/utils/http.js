import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useUserStore } from "@/stores/user";

const httpInstance = axios.create({
  //接口基地址，方便不同接口调用
  baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net",
  //请求超时时间，超过这个5s就报错
  timeout: 5000,
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
    // 统一错误提示
    ElMessage({
      type: "warning",
      message: e.response.data.message,
    });
    return Promise.reject(e);
  },
);

//用httpInstance接收之后要暴露出来
export default httpInstance;

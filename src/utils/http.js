import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";

const httpInstance = axios.create({
  //接口基地址，方便不同接口调用
  baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net",
  //请求超时时间，超过这个5s就报错
  timeout: 5000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
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

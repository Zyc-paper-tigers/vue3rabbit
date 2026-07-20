// 默认导出不需要加花括号，按需导出需要加花括号
import httpInstance from "@/utils/http.js";

export function getBannerAPI() {
  return httpInstance({
    url: "/home/banner",
  });
}

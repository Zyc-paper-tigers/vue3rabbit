import httpInstance from '@/utils/http.js'

//做个测试
export function getCategoryAPI () {
  return httpInstance({
    url: '/home/category/head'
  })
}
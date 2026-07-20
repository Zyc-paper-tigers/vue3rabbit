// 由于要调用接口，我们要使用之前已经暴露在外的接口实例，这样就不用写这么长
import httpInstance from '@/utils/http.js'

export function getCategoryAPI () {
  return httpInstance({
    url: '/home/category/head'
  })
}``
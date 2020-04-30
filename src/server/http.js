import axios from 'axios'
import { Toast } from 'vant';// 可有可无，你也可以用elementUI

// 循环遍历输出不同的请方法
let instance = axios.create({
  // 基础地址
  baseURL: 'http://localhost:9000/api',
  // 超时不请求
  timeout: 8000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// 方法，连接，数据
let http = function(method, url, data, config){
  // 将请求方法全都变为小写
  method = method.toLocaleLowerCase();
  // post请求
  if (method === "post"){
    return instance.post(url, data, config)
  } else if (method === "get"){
    return instance.get(url, {
      params: data
    }, config)
  } else if(method === "delete"){
    return instance.delete(url, {
      params: data
    })
  } else if(method === "put"){
    return instance.put(url, {
      params: data
    })
  } else if(method === "patch"){
    return instance.patch(url, {
      params: data
    })
  }
}

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // config 为请求的一些配置 例如：请求头 请求时间 Token  可以根据自己的项目需求个性化配置
  // config.headers.token = ''
  // 发起请求前做什么
  Toast.loading({
    // 取消遮罩
    mask: false,
    duration: 0,
    // 动画出现时候禁止其他点击
    forbidClick: true,
    message: '加载中...'
  })
  return config;
}, error => {
  return Promise.reject(error)
});
// 添加响应拦截器
instance.interceptors.response.use(res => {
  // 请求成功，Toast就清理掉
  Toast.clear();
  return res.data;
}, ()=>{
  Toast.clear();
  Toast('返回错误');
});



export default http;
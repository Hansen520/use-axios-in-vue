import axios from 'axios';
import service from './contactApi';
import { Toast } from 'vant';// 可有可无，你也可以用elementUI

// 循环遍历输出不同的请方法
let instance = axios.create({
  // 基础地址
  baseURL: 'http://localhost:9000/api',
  // 超时不请求
  timeout: 1000
});
// 包裹请求方法的容器
const Http = {};
// 请求格式/参数的统一
for (let key in service) {
  // url method
  let api = service[key];
  // params是向get获得的参数，而isFromData是向post请求的参数，
  Http[key] = async function(
    // 请求参数get:url | put(data) | post(data) | patch(data) | delete:url
    params,
    // 标识是否为form请求
    isFormData = false,
    // 配置参数
    config = {}
  ){

    // post中的form-data
    let newParams = {};
    // contact-type是否是form-data的判断
    if(params && isFormData) {
      //通过FormData构造函数创建一个空对象
      newParams = new FormData();
      for (let i in params) {
        //可以通过append()方法来追加数据
        newParams.append(i, params[i])
      }
    } else {
      // 如果没有表单请求，直接将params或者data赋值
      newParams = params
    }

    // 去请求的返回值
    let response = {};
    // 不同请求的判断
    if(api.method === 'put' || api.method === 'post' || api.method === 'patch'){
      try {
        // 用await可以直接获取数据 ,axios请求配置的写法，其实config就是配置的信息，包裹params，data，outtime等等
        response = await instance[api.method](api.url, newParams, config)
      } catch (err) {
        response = err
      }
    } else if(api.method === 'get' || api.method === 'delete') {
      config.params = newParams;
      try {
        response = await instance[api.method](api.url, config)
      } catch(err) {
        response = err
      }
    }
    return response;
  }
}

// 请求拦截器
instance.interceptors.request.use(config => {
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
}, ()=> {
  // 请求错误
  Toast.clear();
  Toast('请求错误，请稍后重试')
});

// 响应拦截器
instance.interceptors.response.use(res => {
  // 请求成功，Toast就清理掉
  Toast.clear();
  return res.data;
}, ()=>{
  Toast.clear();
  Toast('返回错误');
});

export default Http;



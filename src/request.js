import axios from 'axios';
 
const TIMEOUT = 10000; // 默认超时时间为10秒
 
// 创建一个axios实例
const instance = axios.create({
  baseURL:  "/dev-api", // api的base_url import.meta.env.VUE_APP_BASE_API 也可以直接写
  timeout: TIMEOUT, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});
 
// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      // 设置请求头token
      config.headers.token =  token;
      console.log(config)
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
 
// 响应拦截器
instance.interceptors.response.use(
  response => {
    // // 对响应数据做点什么
    // if(response.config.url =="/authentication/login"){
    //   if(response.headers.token != undefined){
    //     localStorage.setItem('token',response.headers.token);
    //   }
    // }
    //登录是否过期
    if(response.data.code ==401){
      localStorage.removeItem('token');
      //全局登录状态
      this.$store.commit('logout');
    }
    return response.data;
  },
  error => {
    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // token过期或未登
          localStorage.removeItem('token');
        //   this.$store.commit('logout');
          break;
        case 404:
          // 资源不存在
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);
 
export default {
  get(url, params = {}, timeout = TIMEOUT) {
    return instance.get(url, {
      params,
      timeout
    });
  },
  post(url, data = {}, timeout = TIMEOUT) {
    return instance.post(url, data, {
      timeout
    });
  },
  put(url, data = {}, timeout = TIMEOUT) {
    return instance.put(url, data, {
      timeout
    });
  },
  delete(url, params = {}, timeout = TIMEOUT) {
    return instance.delete(url, {
      params,
      timeout
    });
  }
};
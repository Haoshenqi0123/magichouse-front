import axios from 'axios';
import { Message } from 'element-ui';

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: '/apis',
  withCredentials: true,
  timeout: 5000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    config.headers['Access-Control-Allow-Credentials'] = 'true';
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type, api_key, Authorization';
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';//'application/x-www-form-urlencoded';
    //config.headers['Accept'] = 'application/json';
    

  if(config.method=='post' || config.method=='put'){
        config.data = {  
            ...config.data//,  
            // _t: Date.parse(new Date())/1000,  
        }

        config.transformRequest= [function (data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in config.data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(config.data[it]) + '&'
        }
        return ret
      }]
    }else if(config.method=='get'){  
        config.params = {  
            // _t: Date.parse(new Date())/1000,  
            ...config.params  
        }  
    }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  // const code = response.data.status;
  if ((response.data!= undefined && response.data.status === 401) || response.status ===401) {
    Message({
      message: response.data.message,
      type: 'error',
      duration: 5 * 1000
    });
  }else {
    return response
  }
  },error => {
    console.log(JSON.stringify(error))
    if(error.response != undefined){
        if(error.response.status==401){
          Message({
            message: error.response.data.message,
            type: 'error',
            duration: 5 * 1000
          });
        }else if(error.response.status==404){
          return Message.error('接口调用404');
        }else if (error.response.status==400) {
          return Promise.reject(error.response);
        }else{
          Message({
            message: '网络错误，请重试',
            type: 'error',
            duration: 5 * 1000
          });
        }
    }else{
      Message({
        message: '网络错误，请重试',
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject(error);
    }
    
  }
)

export default service;

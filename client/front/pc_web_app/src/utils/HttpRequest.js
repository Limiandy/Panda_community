// 封装axios请求，返回重新封装的数据格式
// 对错误的统一处理
import axios from "axios";
import errorHandle from "./errorHandle";

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  // 获取配置
  getInsideConfig() {
    return {
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        timeout: 10000
      }
    };
  }
  // 设置拦截器
  interceptors(instance) {
    // Add a request interceptor
    instance.interceptors.request.use(
      config => {
        // Do something before request is sent
        return config;
      },
      error => {
        // Do something with request error
        errorHandle(error);
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    instance.interceptors.response.use(
      res => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (res.status === 200) {
          return Promise.resolve(res.data);
        }
        return Promise.reject(res);
      },
      error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        errorHandle(error);
        return Promise.reject(error);
      }
    );
  }
  // 创建实例
  request(options) {
    const instance = axios.create();
    const newOptions = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance);
    return instance(newOptions);
  }
  get(url, config) {
    const options = Object.assign(
      {
        method: "get",
        url: url
      },
      config
    );
    return this.request(options);
  }
  post(url, data) {
    this.request({
      method: "post",
      url: url,
      data: data
    });
  }
}

export default HttpRequest;
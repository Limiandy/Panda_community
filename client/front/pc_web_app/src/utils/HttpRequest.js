// 封装axios请求，返回重新封装的数据格式
// 对错误的统一处理
import axios from "axios";
import errorHandle from "./errorHandle";
import AxiosConfig from "@/config/index";
import store from "@/store";
const CancelToken = axios.CancelToken;
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.pending = {};
  }
  removePending(key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]("取消重复请求");
    }
    delete this.pending[key];
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
        // 设定请求非公共接口（需要鉴权）带上token
        let isPublic = false;
        AxiosConfig.publicPath.map(path => {
          isPublic = isPublic || path.test(config.url);
        });
        const token = store.state.token;
        if (!isPublic && token) {
          config.headers.Authorization = "Bearer " + token;
        }

        // Do something before request is sent
        let key = `${config.url}&${config.method}`;
        this.removePending(key, true);
        config.cancelToken = new CancelToken(c => {
          this.pending[key] = c;
        });

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
        let key = `${res.config.url}&${res.config.method}`;
        this.removePending(key);
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
    return this.request({
      method: "post",
      url: url,
      data: data
    });
  }
}

export default HttpRequest;

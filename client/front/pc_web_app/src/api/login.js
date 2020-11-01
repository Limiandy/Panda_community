import axios from "../utils/request";

/**
 * 请求图形验证码接口
 * @param sid
 * @returns {AxiosPromise}
 */
const getCaptcha = sid => {
  return axios.get("/public/getcaptcha", {
    params: {
      sid: sid
    }
  });
};

/**
 * 请求重置密码，发送邮件
 * @param options
 * @returns {AxiosPromise}
 */
const forget = options => {
  return axios.post("/login/forget", {
    ...options
  });
};

/**
 * 登录请求
 * @param loginInfo
 * @returns {AxiosPromise}
 */
const login = loginInfo => {
  return axios.post("/login/login", {
    ...loginInfo
  });
};

/**
 * 注册请求
 * @param userInfo
 * @returns {AxiosPromise}
 */
const register = userInfo => {
  return axios.post("/login/register", {
    ...userInfo
  });
};

export { getCaptcha, forget, login, register };

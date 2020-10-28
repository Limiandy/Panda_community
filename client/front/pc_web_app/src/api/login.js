import axios from "../utils/request";

const getCaptcha = sid => {
  return axios.get("/public/getcaptcha", {
    params: {
      sid: sid
    }
  });
};

const forget = options => {
  return axios.post("/login/forget", {
    ...options
  });
};

const login = loginInfo => {
  return axios.post("/login/login", {
    ...loginInfo
  });
};

const register = userInfo => {
  return axios.post("/login/register", {
    ...userInfo
  });
};

export { getCaptcha, forget, login, register };

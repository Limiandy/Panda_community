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

export { getCaptcha, forget, login };

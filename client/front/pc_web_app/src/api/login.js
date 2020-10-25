import axios from "../utils/request";

const getCaptcha = sid => {
  return axios.get("/getcaptcha", {
    params: {
      sid: sid
    }
  });
};

const forget = options => {
  return axios.post("/forget", {
    ...options
  });
};

export { getCaptcha, forget };

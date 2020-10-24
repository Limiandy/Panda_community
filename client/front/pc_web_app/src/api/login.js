import axios from "../utils/request";

const getCaptcha = () => {
  return axios.get("/getcaptcha");
};

const forget = options => {
  return axios.post("/forget", {
    ...options
  });
};

export { getCaptcha, forget };

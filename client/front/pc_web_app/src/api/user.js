import axios from "../utils/request";
import qs from "qs";
// 签到
const userSign = () => axios.get("/user/fav");
// 更新用户资料
const updateUserInfo = data => axios.post("/user/basic", data);
// 确认修改用户名
const updateUsername = data => {
  return axios.get("/public/reset-email?" + qs.stringify(data));
};
// 确认修改重置密码
const updatePassword = data =>
  axios.get("/public/reset-pwd?" + qs.stringify(data));

// 修改密码
const changePassword = data => axios.post("/user/change-pwd", data);

// 请求用户信息
const getUserInfo = data => axios.post("/public/user-info", data);
export {
  userSign,
  updateUserInfo,
  updateUsername,
  updatePassword,
  changePassword,
  getUserInfo
};

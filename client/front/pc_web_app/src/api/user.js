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
export { userSign, updateUserInfo, updateUsername };

import axios from "../utils/request";

// 签到
const userSign = () => axios.get("/user/fav");
// 更新用户资料
const updateUserInfo = data => axios.post("/user/basic", data);

export { userSign, updateUserInfo };

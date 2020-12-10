import axios from "@/utils/request";
import stroe from "@/store";
import qs from "qs";

// noinspection JSValidateJSDoc
/**
 * 请求文章列表
 * @param {Object} options 请求文章列表接口参数
 * @returns {AxiosPromise}
 */
const getList = options => {
  return axios.get("/public/list?" + qs.stringify(options));
};
// noinspection JSValidateJSDoc
/**
 * 温馨提醒
 * @returns {AxiosPromise}
 */
const getTips = () => {
  return axios.get("/public/tips");
};
// noinspection JSValidateJSDoc
/**
 * 本周热议
 * @returns {AxiosPromise}
 */
const getTopWeek = () => {
  return axios.get("/public/topWeek");
};
// noinspection JSValidateJSDoc
/**
 * 友情链接
 * @returns {AxiosPromise}
 */
const getLinks = () => {
  return axios.get("/public/links");
};

// 图片上传接口
const uploadImg = formDate => axios.post("/content/uploadImg", formDate);

// 发布新帖接口
const publishPost = data => axios.post("/content/publishPost", data);

// 获取文章详情
const getDetail = tid =>
  axios.get(
    "/public/content/detail?" +
      qs.stringify({ tid: tid, token: stroe.state.token })
  );

export {
  getList,
  getTips,
  getLinks,
  getTopWeek,
  uploadImg,
  publishPost,
  getDetail
};

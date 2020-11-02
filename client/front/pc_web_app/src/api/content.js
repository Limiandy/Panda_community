import axios from "@/utils/request";
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
export { getList, getTips, getLinks, getTopWeek };

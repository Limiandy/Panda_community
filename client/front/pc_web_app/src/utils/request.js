import httpRequest from "./HttpRequest";
import config from "@/config";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? config.baseURL.dev
    : config.baseURL.prod;

const axios = new httpRequest(baseUrl);

export default axios;

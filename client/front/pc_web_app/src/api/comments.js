import axios from "@/utils/request";

// 获取文章评论列表
const getComments = tid => axios.get("/public/comments?tid=" + tid);

// 获取用户的评论列表
const getPublicComment = uid => axios.get("/public/public-comment?uid=" + uid);

// 发表评论
const publishComment = data => axios.post("/comment/publish-comment", data)

export { getComments, getPublicComment, publishComment };

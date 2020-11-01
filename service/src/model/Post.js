import mongoose from '../config/DBHelpler'
import moment from 'dayjs'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  uid: { type: String, ref: 'users' },
  title: String,
  content: String,
  created: Date,
  catalog: String,
  fav: String,
  isEn: String,
  read: Number,
  answer: Number,
  status: String,
  isTop: String,
  tags: Array
})

PostSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

PostSchema.statics = {
  /**
   * 获取文章列表数据
   * @param {Object} options 筛选条件
   * @param {String} sort 排序方式
   * @param {Number} page 分页页数
   * @param {Number} limit 分页条数
   */
  getList: function (options, sort, page, limit) {
    return this.find(options)
      .sort({ [sort]: -1 })
      .skip(page * limit)
      .limit(limit)
      .populate({
        path: 'uid',
        select: 'nickName isVip pic'
      })
  }
}

const PostModel = mongoose.model('post', PostSchema)

export default PostModel

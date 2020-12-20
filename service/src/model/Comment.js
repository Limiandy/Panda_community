import mongoose from '@/config/DBHelpler'
import moment from 'dayjs'
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  tid: { type: String, ref: 'post' },
  cuid: { type: String, ref: 'users' },
  content: { type: String },
  created: { type: Date },
  hands: { type: Number, default: 0 },
  status: { type: String, default: '1' },
  isRead: { type: String, default: '0' },
  isBest: { type: String, default: '0' }
})

CommentSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

CommentSchema.statics = {
  getList: function (options, sort) {
    return this.find(options)
      .sort({ created: -1 })
      .populate({
        path: 'cuid',
        select: 'nickName isVip pic'
      })
  },
  findByUid: function (uid, sort, page, limit) {
    return this.find({ cuid: uid }).sort({ [sort]: -1 }).skip(page * limit).limit(limit).populate({
      path: 'tid',
      select: 'title'
    })
  }
}

const CommentModel = mongoose.model('comment', CommentSchema)

export default CommentModel

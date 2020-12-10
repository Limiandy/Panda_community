import mongoose from '@/config/DBHelpler'
import moment from 'dayjs'
import { statics } from 'koa-static'
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  tid: { type: String },
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
      .sort({ [sort]: -1 })
      .populate({
        path: 'cuid',
        select: 'nickName isVip pic'
      })
  }
}

const CommentModel = mongoose.model('comment', CommentSchema)

export default CommentModel

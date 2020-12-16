import mongoose from '../config/DBHelpler'
import moment from 'dayjs'

const Schema = mongoose.Schema

const LinkSchema = new Schema({
  title: { type: String, default: '' },
  link: { type: String, default: '' },
  type: { type: String, default: 'link' },
  created: { type: Date, default: '' },
  isTop: { type: String, default: '' },
  sort: { type: String, default: '' },
  desc: { type: String, default: '' }
})

LinkSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

const LinkModel = mongoose.model('links', LinkSchema)

export default LinkModel

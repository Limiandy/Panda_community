import mongoose from 'mongoose'
import {DB_URL} from './index'

// 创建连接
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 监听连接成功
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to ' + DB_URL)
})

// 监听连接失败
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error' + err)
})

// 监听断开连接
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

export default mongoose

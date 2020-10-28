import mongoose from '../config/DBHelpler'

const Schema = mongoose.Schema

const TestSchema = new Schema({
  email: String,
  nickName: String,
  password: String,
  created: String
})

const UserModel = mongoose.model('users', TestSchema)

export default UserModel

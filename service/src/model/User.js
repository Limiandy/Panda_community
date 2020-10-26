import mongoose from '../config/DBHelpler'

const Schema = mongoose.Schema

const TestSchema = new Schema({
  email: String,
  password: String
})

const UserModel = mongoose.model('users', TestSchema)

export default UserModel

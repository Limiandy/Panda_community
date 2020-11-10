import path from 'path'
const DB_URL = 'mongodb://test:123456@119.3.229.217:27225/testdb'
const REDIS = {
  host: '119.3.229.217',
  port: 15000,
  password: 'libaoquanccc8'
}
const JWT_SECRET = 'chCI*lLZ2XUxfbfoy1*cBnziXSbfcI0Z2YBYtIkTqw8Te1a9*3acx3Ly3*P%zmyX7POWgAlfqU%VHZpWeh7c8Y%RkYTh4vsZZMlfYOvEQshQHA66！PCi4mTjZ7lfrDZ4'
const BASE_URL = process.env.NODE_ENV === 'producton' ? 'http://www.sbfbi.xyz' : 'http://localhost:8080'

const uploadPath = process.env.NODE_ENV === 'producton' ? '/app/public' : path.join(path.resolve(__dirname, '../../public'))
export {
  DB_URL,
  REDIS,
  JWT_SECRET,
  BASE_URL,
  uploadPath
}

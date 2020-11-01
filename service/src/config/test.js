import { setValue } from './RedisConfig'

setValue('imoocobj', {
  name: 'andy',
  age: 30,
  email: 'abc@123.com'
})

// getHValue('imoocobj').then(res => {
//   console.log('getHValue:' + JSON.stringify(res, null, 2))
// })

import redis from 'redis'
const { promisify } = require("util");
import  { REDIS }  from './index'

const options = {
  host: REDIS.host,
  port: REDIS.port,
  password: REDIS.password,
  detect_buffers: true,
  retry_strategy: function(options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
}

const client = redis.createClient(options)
client.on('error', err => {
  console.log('Redis Client Error: ' + err)
})
const setValue = (key, value, time) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return
  }
  if (typeof value === 'string') {
    if (typeof time !== 'undefined') {
      client.set(key, value, 'EX', time)
    } else {
      client.set(key, value)
    }
  }
  if (typeof value === 'object') {
    Object.keys(value).forEach(item => {
      client.hmset(key, item, value[item], redis.print)
    })
  }
}

const getValue = (key) => {
  return promisify(client.get).bind(client)(key);
}

const getHValue = key => {
  return promisify(client.hgetall).bind(client)(key)
}

const delValue = key => {
  client.del(key, (err, res) => {
    if (res === 1) {
      console.log('delete successfully')
    } else {
      console.log('delete redis key error: ' + err)
    }
  })
}

export {
  client,
  setValue,
  getValue,
  getHValue,
  delValue
}

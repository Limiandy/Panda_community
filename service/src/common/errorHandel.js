export default (ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: 'Protected resource, use Authorization header to get access\n'
      }
    } else {
      console.log(err)
      ctx.status = err.status || 500
      ctx.body = {
        code: 500,
        msg: err.message,
        stack: err.stack
      }
    }
  })
}

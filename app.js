const koa = require('koa')
const path = require('path')
const static = require('koa-static')

const blogsPath = path.join(__dirname, './dist')

const app = new koa()

app.use(static(blogsPath))

app.use(async ctx => {
  ctx.body = 'not found ~'
})

app.listen(3000)
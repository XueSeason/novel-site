const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const user = require('./middleware/user')
const hbs = require('./middleware/hbs')
const router = require('./router')

const app = new Koa()

app.use(serve(path.join(__dirname, './public/')))
app.use(hbs)
app.use(user)
app.use(bodyParser())
app.use(router)

app.listen(4000, () => {
  console.log('server listenning at port 4000.')
})

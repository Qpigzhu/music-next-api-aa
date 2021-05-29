const express = require('express')
const compression = require('compression')

const registerRouter = require('./router')

const port = process.env.PORT || 9001

const app = express()

// 解决跨域问题
app.all('*', function(req, res, next) {
  //设为指定的域
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("X-Powered-By", ' 3.2.1');
  next();
});

// const csrfProtection = csrf({
//   cookie: true,
//   ignoreMethods: ['HEAD', 'OPTIONS'],
//   checkPathReg: /^\/api/
// })
// app.use(cookieParser())
// app.use(csrfProtection)

app.get('/', function (req, res, next) {
  return next()
})

registerRouter(app)

app.use(compression())

app.use(express.static('./dist'))


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log("监听地址:127.0.0.1:"+ port + '\n')
})

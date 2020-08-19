// 引入express框架
var express = require('express')
// 引入路径操作模块
var path = require('path')
// POST 第三方插件 body-parser
var bodyParser = require('body-parser')

// 引入路由文件
var router = require('./routes/router')

var app = express()

// 配置body-parser req请求对象上多出来一个属性body  通过req.body 获取post数据
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
// path.join将相对路径改为绝对路径
app.use('/public', express.static(path.join(__dirname, './public/')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')))

// 配置art-template模板引擎
app.engine('html', require('express-art-template'))
// 设置默认访问目录
app.set('/views', path.join(__dirname, './views/'))

// app.get('/', function (req, res) {
//     res.render("index.html", {
//         name: "张三"
//     })
// })

// 把路由挂载到app中
app.use(router)

app.listen(3030, function () {
    console.log("127.0.0.1:3030 running……")
})
// 登录、注册、删除话题、修改话题、查看话题列表

// 引进express框架
var express = require('express')

// 使用expres中的路由
var router = express.Router()

router.get('/', function (req, res) {
    res.render('index.html')
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res) {
    // res.render('login.html')
})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', function (req, res) {
    // res.render('login.html')
    // 1、获取表单的数据
    // 2、操作数据库
    // 3、发送响应
    console.log(req.body)
})

// 导出路由
module.exports = router
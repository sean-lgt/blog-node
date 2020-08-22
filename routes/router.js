// 登录、注册、删除话题、修改话题、查看话题列表

// 引进express框架
var express = require('express')
// 引进md5密码加密
var md5 = require('blueimp-md5')
// 引进user模型
var User = require('../models/user')
const user = require('../models/user')
// 使用expres中的路由
var router = express.Router()

router.get('/', function (req, res) {
    res.render('index.html', {
        user: req.session.user
    })
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res) {
    // 1.获取表单数据
    // 2.查询数据库 用户名和密码是否正确
    // 3.发送响应数据
    var body = req.body
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '邮箱或者密码错误'
            })
        }
        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: '邮箱或者密码不能为空'
            })
        }

    })
    //用户存在 登录成功 通过session 记录登录状态
    req.session.user = user
    res.status(200).json({
        err_code: 0,
        message: '登录成功'
    })
    // res.render('login.html')
})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', function (req, res) {
    // res.render('login.html')
    // 1、获取表单的数据
    // 2、操作数据库,判断用户是否存在
    // 3、发送响应
    console.log(req.body)
    let body = req.body
    User.findOne({
        // 查询或者 $or
        $or: [{
                email: body.email
            },
            {
                nickname: body.nickname
            }

        ]

    }, function (err, data) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: '服务端错误'
            })
        }
        console.log(data)
        if (data) {
            // 邮箱或者昵称已存在
            return res.status(200).send({
                err_code: 1,
                message: '邮箱或者昵称已被使用'
            })
        }
        // res.status(200).send(JSON.stringify({
        //     success: true
        // }))
        // 将密码加密两次
        body.password = md5(md5(body.password))
        new User(body).save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: '服务端错误'
                })
            }

            // 注册成功 使用session 记录用户的登录状态
            req.session.user = user

            // express 提供json方法
            res.status(200).json({
                err_code: 0,
                message: '注册成功'
            })

            // 服务端重定向只针对同步请求有效 异步请求无效

        })
    })
})

router.get('/logout', function (req, res) {
    // 清除登录状态 重定向到登录页
    req.session.user = null
    res.redirect('/login')
})

// 导出路由
module.exports = router
// 引进mongoose包
var mongoose = require('mongoose')
// 需要连接数据库
mongoose.connect('mongodb://localhost/blog', {
    useMongoClient: true
})
// 创建一个Schema
var Schema = mongoose.Schema

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        // 注意不要写成Date.now() 因为会即可调用
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        // 默认为空
        default: ''
    },
    gender: {
        type: Number,
        // 枚举-1为保密 0为男 1为女
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        // 枚举 0没有权限限制，1不可以评论，2不可以登录
        enum: [0, 1, 2],
        default: 0
    }

})

// 暴露出去
module.exports = mongoose.model('User', userSchema)
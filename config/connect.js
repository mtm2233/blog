const express = require('express')
const app = express()
const bodyParser = require('body-parser') // 解析参数
const cors = require('cors')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const key = "qq.com@2541817610/youcann"
const backey = "youcann.club@matianmeng"

app.use(bodyParser.json({ limit: "2100000kb" })) // json请求
app.use(bodyParser.urlencoded({ extended: false })) // 表单请求
app.use(cors()) // 解决跨域
// const conn = mysql.createConnection(option) // 创建数据库连接
let pool;
repool()
// 监听error事件，如果err.code返回了以上字符，那么我们就重新发起连接，直到连接成功
function repool() { // 断线重连机制
    pool = mysql.createPool({
        host: 'localhost',
        user: 'mblog',
        password: 'fTHp6a6EZiZ7TGNR',
        prot: '888',
        database: 'mblog',
        connectTimeout: 5000,
        multipleStatements: false,
        waitForConnections: true,// 当无连接池可用时；等待（true)还是抛错(false)
        connectionLimit: 100,// 连接数限制
        queueLimit: 0 // 最大连接等待数(0为无限制)
    })
    pool.on('error', err => err.code === 'PROTOCOL_CONNECTION_LOST' && repool());
    // app.all('*', (_, __, next) => pool.getConnection(err => err && repool() || next()))
}

module.exports = { pool, express, app, jwt, key, backey }
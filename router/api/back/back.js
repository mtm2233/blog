const { pool, express, jwt, backey } = require('../../../config/connect')
const app = express()
const login = require('./login')
const user = require('./user')
const fLink = require('./fLink')
const album = require('./album')
const article = require('./article')
const tags = require('./tags')
const reply = require('./reply')
const reward = require('./reward')

app.use('/login', login)
// 如果没有携带token,返回
app.all('*', (req, res, next) => {
    let username
    try {
        username = jwt.verify(req.headers.logintoken, backey)
        next()
    } catch (e) {
        return res.json({ data: e, msg: '请检查token是否正确', status: 401 }) 
    }
})

app.use('/user', user)
app.use('/flink', fLink)
app.use('/album', album)
app.use('/article', article)
app.use('/tags', tags)
app.use('/reply', reply)
app.use('/reward', reward)

// 如果没有路径处理就返回 Not Found
app.all('*', (req, res, next) => {
    res.json({ data: null, msg: 'Back Not Found', status: 400 })
})
module.exports = app
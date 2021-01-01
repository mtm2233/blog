const { app } = require('./config/connect')

const menus = require('./router/api/menus')
const article = require('./router/api/article')
const reply = require('./router/api/reply')
const user = require('./router/api/user')
const friend = require('./router/api/friend')
const album = require('./router/api/album')
const tag = require('./router/api/tag')
const reward = require('./router/api/reward')
const img = require('./router/api/img')
const emoji = require('./router/api/emoji')
// back
const back = require('./router/api/back/back')

app.use('/menus', menus)
app.use('/article', article)
app.use('/reply', reply)
app.use('/user', user)
app.use('/friend', friend)
app.use('/album', album)
app.use('/tag', tag)
app.use('/reward', reward)
app.use('/img', img)
app.use('/emoji', emoji)
// back
app.use('/back',back)

// 如果没有路径处理就返回 Not Found
app.all('*', (req, res, next) => {
    res.json({ data: null, msg: 'Not Found', status: 400 })
})
// https.createServer(options,app).listen(443)
app.listen(2541, () => console.log('服务启动，访问localhost:2541'))